import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get("questionId");
  const countOnly = searchParams.get("count") === "true";

  if (!questionId) {
    return NextResponse.json({ error: "questionId required" }, { status: 400 });
  }

  if (!isSupabaseConfigured || !supabase) {
    return countOnly
      ? NextResponse.json({ count: 0 })
      : NextResponse.json({ responses: [] });
  }

  if (countOnly) {
    const { count, error } = await supabase
      .from("gateway_responses")
      .select("id", { count: "exact", head: true })
      .eq("question_id", questionId);

    if (error) return NextResponse.json({ count: 0 });
    return NextResponse.json({ count: count ?? 0 });
  }

  const { data, error } = await supabase
    .from("gateway_responses")
    .select("id, answer, display_name, created_at")
    .eq("question_id", questionId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    console.error("Supabase GET error:", error);
    return NextResponse.json({ responses: [] });
  }

  return NextResponse.json({ responses: data ?? [] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { questionId, answer, displayName } = body;

  if (
    !questionId ||
    !answer ||
    typeof answer !== "string" ||
    answer.trim().length === 0
  ) {
    return NextResponse.json(
      { error: "questionId and answer required" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json({ ok: true, offline: true });
  }

  const { error } = await supabase.from("gateway_responses").insert({
    question_id: questionId,
    answer: answer.trim().slice(0, 500),
    display_name: displayName?.trim()?.slice(0, 80) || null,
  });

  if (error) {
    console.error("Supabase POST error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
