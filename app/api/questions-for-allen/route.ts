import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  let body: { question?: string; contact?: string; contextQuestionId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const { question, contact, contextQuestionId } = body;

  if (!question || typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "question required" }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabase) {
    // No DB — acknowledge gracefully, visitor message isn't lost
    return NextResponse.json({ ok: true, offline: true });
  }

  const { error } = await supabase.from("visitor_questions").insert({
    question: question.trim().slice(0, 1000),
    contact: contact?.trim()?.slice(0, 200) || null,
    context_question_id: contextQuestionId || null,
    is_anonymous: !contact?.trim(),
  });

  if (error) {
    console.error("Supabase visitor_questions error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
