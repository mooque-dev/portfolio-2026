export interface Question {
  id: string;
  text: string;
  allenAnswer?: string; // Allen's personal answer — shown after a visitor submits theirs
}

// A pool of questions — philosophical, practical, and personal.
// Designed to invite reflection without demanding it.
export const questions: Question[] = [
  {
    id: "q01",
    text: "What is good design?",
    allenAnswer: "Asking a better question than the one you were given.",
  },
  {
    id: "q02",
    text: "What does it mean to do work that matters?",
    allenAnswer: "When you'd still do it if nobody was watching — but you're glad they are.",
  },
  {
    id: "q03",
    text: "What's something you made that you're proud of?",
    allenAnswer: "A design system nobody had to be told to use. That felt like winning.",
  },
  {
    id: "q04",
    text: "What does care look like in practice?",
    allenAnswer:
      "Slowing down when everyone else is rushing. Holding space when the room wants to collapse it.",
  },
  {
    id: "q05",
    text: "When did you last change your mind about something important?",
    allenAnswer:
      "I used to think governance made design systems stick. Turns out, making them easier to use does.",
  },
  {
    id: "q06",
    text: "What's worth protecting?",
    allenAnswer:
      "The beginner's mind. I try not to let experience become arrogance.",
  },
  {
    id: "q07",
    text: "What does home feel like to you?",
    allenAnswer:
      "A kitchen that smells like something real. People who argue about the right way to do something small.",
  },
  {
    id: "q08",
    text: "What's the last thing that genuinely surprised you?",
    allenAnswer:
      "That my most honest writing resonated more than my most polished work.",
  },
  {
    id: "q09",
    text: "What makes collaboration feel good?",
    allenAnswer:
      "When everyone in the room is trying to find the best idea — not protect their own.",
  },
  {
    id: "q10",
    text: "What's one thing you wish more people understood?",
    allenAnswer:
      "That being useful and being right are completely different things. I'd rather be useful.",
  },
  {
    id: "q11",
    text: "What is the meaning of love?",
    allenAnswer: "Showing up when it's inconvenient. Again. Without keeping score.",
  },
  {
    id: "q12",
    text: "What makes you happy in life?",
    allenAnswer: "Cooking something for people. Watching them eat.",
  },
  {
    id: "q13",
    text: "What would you make if no one was watching?",
    allenAnswer: "I'm making it. You're looking at it.",
  },
  {
    id: "q14",
    text: "What does rest look like for you?",
    allenAnswer: "A quiet morning, bad coffee, and something worth reading.",
  },
  {
    id: "q15",
    text: "What are you trying to figure out right now?",
    allenAnswer: "What the next chapter looks like. I'm in the middle of it.",
  },
];

// One question per day, same for all visitors — creates a shared experience.
export function getDailyIndex(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % questions.length;
}

export function getDailyQuestion(): Question {
  return questions[getDailyIndex()];
}
