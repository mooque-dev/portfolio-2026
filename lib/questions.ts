export interface Question {
  id: string;
  text: string;
}

// A pool of questions — philosophical, practical, and personal.
// Designed to invite reflection without demanding it.
export const questions: Question[] = [
  { id: "q01", text: "What is good design?" },
  { id: "q02", text: "What does it mean to do work that matters?" },
  { id: "q03", text: "What's something you made that you're proud of?" },
  { id: "q04", text: "What does care look like in practice?" },
  { id: "q05", text: "When did you last change your mind about something important?" },
  { id: "q06", text: "What's worth protecting?" },
  { id: "q07", text: "What does home feel like to you?" },
  { id: "q08", text: "What's the last thing that genuinely surprised you?" },
  { id: "q09", text: "What makes collaboration feel good?" },
  { id: "q10", text: "What's one thing you wish more people understood?" },
  { id: "q11", text: "What is the meaning of love?" },
  { id: "q12", text: "What makes you happy in life?" },
  { id: "q13", text: "What would you make if no one was watching?" },
  { id: "q14", text: "What does rest look like for you?" },
  { id: "q15", text: "What are you trying to figure out right now?" },
];

// One question per day, same for all visitors — creates a shared experience.
export function getDailyQuestion(): Question {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return questions[dayIndex % questions.length];
}
