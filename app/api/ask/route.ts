import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { rateLimit, clientKey } from "@/lib/ratelimit";
import { ASK_MODEL, MAX_OUTPUT_TOKENS, SYSTEM_PROMPT } from "@/lib/ask-allen";

export const runtime = "nodejs";

const hasKey = !!process.env.ANTHROPIC_API_KEY;
const client = hasKey ? new Anthropic() : null;

type ChatMessage = { role: "user" | "assistant"; content: string };

function text(body: string, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function POST(request: NextRequest) {
  // Abuse + cost guard: cap requests per IP.
  if (!rateLimit(clientKey(request, "ask"), 12, 60_000)) {
    return text("You're going a little fast — give me a moment and try again.", 429);
  }

  // Graceful degradation when no key is configured (e.g. before deploy setup).
  if (!hasKey || !client) {
    return text(
      "The chat isn't switched on yet. In the meantime, explore the Work and About sections — or email allen@mooque.xyz.",
      200
    );
  }

  let body: { messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return text("Invalid request.", 400);
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  // Sanitize: keep the last 10 turns, cap each message length, enforce shape.
  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" ||
          (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    )
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.trim().slice(0, 1500) }))
    .filter((m) => m.content.length > 0);

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return text("Ask me something about Allen's work.", 400);
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const llm = client.messages.stream({
          model: ASK_MODEL,
          max_tokens: MAX_OUTPUT_TOKENS,
          system: SYSTEM_PROMPT,
          messages,
        });
        for await (const event of llm) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Ask Allen error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry — something went wrong on my end. Mind trying again, or email allen@mooque.xyz?"
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
