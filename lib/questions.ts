export interface Question {
  id: string;
  text: string;
  allenAnswer?: string;
}

export const questions: Question[] = [
  {
    id: "q01",
    text: "What is good design?",
    allenAnswer: "Asking a better question than the one you were given.",
  },
  {
    id: "q02",
    text: "What makes something feel obvious in hindsight?",
    allenAnswer:
      "Someone removed everything that was hiding it. That's the job.",
  },
  {
    id: "q03",
    text: "When does adding more actually remove clarity?",
    allenAnswer:
      "The moment you start designing for your own anxiety instead of the person using it.",
  },
  {
    id: "q04",
    text: "What's the difference between being right and being useful?",
    allenAnswer:
      "Being right is for you. Being useful is for someone else. I'd rather be useful.",
  },
  {
    id: "q05",
    text: "When did you last change your mind about something you were certain of?",
    allenAnswer:
      "I used to think governance made design systems stick. Turns out, making them easier to use does.",
  },
  {
    id: "q06",
    text: "When is the best solution also the wrong answer?",
    allenAnswer:
      "When it solves the problem nobody actually has. It happens more than anyone admits.",
  },
  {
    id: "q07",
    text: "What makes a constraint feel liberating?",
    allenAnswer:
      "When it removes the options that were never really options. A smaller room you can actually furnish.",
  },
  {
    id: "q08",
    text: "What's the last thing that genuinely surprised you?",
    allenAnswer:
      "That my most honest writing resonated more than my most polished work.",
  },
  {
    id: "q09",
    text: "When does experience become a liability?",
    allenAnswer:
      "When you stop asking why and start just knowing. The beginner sees the problem. The expert sees the solution they've already built.",
  },
  {
    id: "q10",
    text: "What gets lost when everything is optimized?",
    allenAnswer:
      "The thing that made it worth doing in the first place. Optimization is a direction, not a destination.",
  },
  {
    id: "q11",
    text: "What's the cost of always being the person with the answer?",
    allenAnswer:
      "You stop hearing the question. And eventually, people stop asking.",
  },
  {
    id: "q12",
    text: "What does it mean to design for someone you fundamentally disagree with?",
    allenAnswer:
      "It means separating your taste from their needs. That's where the real work is.",
  },
  {
    id: "q13",
    text: "What would you make if no one was watching?",
    allenAnswer: "I'm making it. You're looking at it.",
  },
  {
    id: "q14",
    text: "What gets harder to see the closer you are to it?",
    allenAnswer:
      "Whether the thing you're building is actually solving a problem, or just becoming a more elaborate version of it.",
  },
  {
    id: "q15",
    text: "What are you trying to figure out right now?",
    allenAnswer: "What the next chapter looks like. I'm in the middle of it.",
  },
];

// One question per day, same for all visitors, creates a shared moment.
export function getDailyIndex(): number {
  return Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % questions.length;
}

export function getDailyQuestion(): Question {
  return questions[getDailyIndex()];
}
