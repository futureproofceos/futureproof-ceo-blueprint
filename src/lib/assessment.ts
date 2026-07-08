export type ConstructKey = "purpose" | "resilience" | "stewardship" | "growth";

export interface Construct {
  key: ConstructKey;
  name: string;
  short: string;
  description: string;
  color: string;
  cssVar: string;
}

export const CONSTRUCTS: Record<ConstructKey, Construct> = {
  purpose: {
    key: "purpose",
    name: "Purpose Architecture",
    short: "Purpose",
    description:
      "Clarity of mission, alignment of values, and the coherence between what you say matters and how you actually allocate time and capital.",
    color: "var(--primary)",
    cssVar: "--primary",
  },
  resilience: {
    key: "resilience",
    name: "Resilience Architecture",
    short: "Resilience",
    description:
      "Emotional regulation, recovery capacity, and the internal systems that let you absorb pressure without eroding judgment.",
    color: "var(--primary-glow)",
    cssVar: "--primary-glow",
  },
  stewardship: {
    key: "stewardship",
    name: "Stewardship Architecture",
    short: "Stewardship",
    description:
      "How you protect people, capital, reputation, and long-horizon assets under your care — the discipline of holding what has been entrusted to you.",
    color: "var(--gold)",
    cssVar: "--gold",
  },
  growth: {
    key: "growth",
    name: "Growth Readiness",
    short: "Growth",
    description:
      "Openness to feedback, learning velocity, and the structural capacity to expand your leadership as the organization scales.",
    color: "var(--accent)",
    cssVar: "--accent",
  },
};

export interface Question {
  id: string;
  construct: ConstructKey;
  text: string;
  reverse?: boolean;
}

// 44 questions (11 per construct). Mix of forward and reverse-coded.
export const QUESTIONS: Question[] = [
  // Purpose Architecture
  { id: "p1", construct: "purpose", text: "I can articulate the purpose of my leadership in a single sentence." },
  { id: "p2", construct: "purpose", text: "My weekly calendar reflects what I claim to value most." },
  { id: "p3", construct: "purpose", text: "When priorities collide, I have a clear internal hierarchy to decide by." },
  { id: "p4", construct: "purpose", text: "I frequently take on obligations that quietly contradict my stated mission.", reverse: true },
  { id: "p5", construct: "purpose", text: "The people closest to me could accurately describe what I stand for." },
  { id: "p6", construct: "purpose", text: "I make major decisions by referring to principles, not just circumstances." },
  { id: "p7", construct: "purpose", text: "I often feel my work is drifting from why I originally began it.", reverse: true },
  { id: "p8", construct: "purpose", text: "I regularly revisit and refine the reasons behind my long-term commitments." },
  { id: "p9", construct: "purpose", text: "My organization's strategy is a direct extension of my personal convictions." },
  { id: "p10", construct: "purpose", text: "I decline opportunities that don't fit my defined purpose, even when they are attractive." },
  { id: "p11", construct: "purpose", text: "I could explain to a stranger why my work matters beyond financial outcomes." },

  // Resilience Architecture
  { id: "r1", construct: "resilience", text: "I recover quickly from setbacks without losing strategic focus." },
  { id: "r2", construct: "resilience", text: "Under sustained pressure, the quality of my judgment holds steady." },
  { id: "r3", construct: "resilience", text: "I have reliable practices that restore my energy each week." },
  { id: "r4", construct: "resilience", text: "Difficult conversations tend to drain me for days afterward.", reverse: true },
  { id: "r5", construct: "resilience", text: "I can distinguish between real threats and emotional noise in the moment." },
  { id: "r6", construct: "resilience", text: "I have people I can speak to honestly when things are hard." },
  { id: "r7", construct: "resilience", text: "I frequently operate near the edge of exhaustion for long stretches.", reverse: true },
  { id: "r8", construct: "resilience", text: "I sleep and eat in ways that support sustained performance." },
  { id: "r9", construct: "resilience", text: "When I make a mistake, I metabolize it without excessive self-punishment." },
  { id: "r10", construct: "resilience", text: "My identity is not dependent on the next result going well." },
  { id: "r11", construct: "resilience", text: "I have a clear internal signal that tells me when to slow down before I break." },

  // Stewardship Architecture
  { id: "s1", construct: "stewardship", text: "I treat the capital under my authority as if it belonged to someone I love." },
  { id: "s2", construct: "stewardship", text: "I actively protect the people who depend on my decisions, even at personal cost." },
  { id: "s3", construct: "stewardship", text: "I have clear ethical lines I will not cross, even for significant gain." },
  { id: "s4", construct: "stewardship", text: "I take shortcuts on governance when the timeline is tight.", reverse: true },
  { id: "s5", construct: "stewardship", text: "I am transparent with stakeholders about risks I am carrying." },
  { id: "s6", construct: "stewardship", text: "The systems I have built would function well without my daily involvement." },
  { id: "s7", construct: "stewardship", text: "I make succession, continuity, and legacy explicit parts of my planning." },
  { id: "s8", construct: "stewardship", text: "I sometimes prioritize short-term optics over long-term durability.", reverse: true },
  { id: "s9", construct: "stewardship", text: "I know precisely what I am accountable for and what I am not." },
  { id: "s10", construct: "stewardship", text: "I honor commitments even when circumstances make them costly." },
  { id: "s11", construct: "stewardship", text: "I consider the second- and third-order effects of my major decisions." },

  // Growth Readiness
  { id: "g1", construct: "growth", text: "I actively invite feedback from people who will disagree with me." },
  { id: "g2", construct: "growth", text: "I have changed a significant belief in the past year based on evidence." },
  { id: "g3", construct: "growth", text: "I invest deliberate time each week in learning outside my domain." },
  { id: "g4", construct: "growth", text: "I tend to protect my ego rather than examine hard feedback.", reverse: true },
  { id: "g5", construct: "growth", text: "I develop the people around me faster than I develop myself.", reverse: true },
  { id: "g6", construct: "growth", text: "I can name the specific leadership capability I am currently building." },
  { id: "g7", construct: "growth", text: "I have mentors or peers who consistently stretch my thinking." },
  { id: "g8", construct: "growth", text: "I experiment with new approaches before I am forced to." },
  { id: "g9", construct: "growth", text: "I hold my own opinions loosely enough to be genuinely persuaded." },
  { id: "g10", construct: "growth", text: "I know the type of leader my organization will need in three years — and I am becoming that person." },
  { id: "g11", construct: "growth", text: "I regularly reflect in writing on how my leadership is evolving." },
];

export const LIKERT: { value: number; label: string }[] = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Slightly Disagree" },
  { value: 4, label: "Slightly Agree" },
  { value: 5, label: "Agree" },
  { value: 6, label: "Strongly Agree" },
];

export type Answers = Record<string, number>;

export interface ConstructScore {
  key: ConstructKey;
  name: string;
  short: string;
  raw: number;      // 0–100
  answered: number;
  total: number;
}

export interface ScoreResult {
  scores: ConstructScore[];
  overall: number;
  confidence: number; // 0–100
  balance: number;    // 0–100 (100 = perfectly balanced)
  profile: Profile;
  strengths: ConstructScore[];
  risks: ConstructScore[];
}

export interface Profile {
  title: string;
  archetype: string;
  summary: string;
  guidance: string;
}

function normalize(value: number, reverse: boolean | undefined) {
  // Likert 1–6 → 0–100
  const v = reverse ? 7 - value : value;
  return ((v - 1) / 5) * 100;
}

export function scoreAssessment(answers: Answers): ScoreResult {
  const scores: ConstructScore[] = (Object.keys(CONSTRUCTS) as ConstructKey[]).map((key) => {
    const items = QUESTIONS.filter((q) => q.construct === key);
    const answered = items.filter((q) => typeof answers[q.id] === "number");
    const sum = answered.reduce((acc, q) => acc + normalize(answers[q.id], q.reverse), 0);
    const raw = answered.length ? sum / answered.length : 0;
    return {
      key,
      name: CONSTRUCTS[key].name,
      short: CONSTRUCTS[key].short,
      raw: Math.round(raw),
      answered: answered.length,
      total: items.length,
    };
  });

  const totalAnswered = scores.reduce((a, s) => a + s.answered, 0);
  const totalItems = scores.reduce((a, s) => a + s.total, 0);
  const overall = Math.round(scores.reduce((a, s) => a + s.raw, 0) / scores.length);

  // Balance: 100 - normalized standard deviation across constructs
  const mean = overall;
  const variance =
    scores.reduce((a, s) => a + Math.pow(s.raw - mean, 2), 0) / scores.length;
  const sd = Math.sqrt(variance);
  const balance = Math.max(0, Math.round(100 - sd * 2.2));

  const confidence = Math.round((totalAnswered / totalItems) * 100);

  const sorted = [...scores].sort((a, b) => b.raw - a.raw);
  const strengths = sorted.slice(0, 2);
  const risks = sorted.slice(-2).reverse();

  const profile = deriveProfile(scores, balance);

  return { scores, overall, confidence, balance, profile, strengths, risks };
}

function deriveProfile(scores: ConstructScore[], balance: number): Profile {
  const map = Object.fromEntries(scores.map((s) => [s.key, s.raw])) as Record<ConstructKey, number>;
  const top = [...scores].sort((a, b) => b.raw - a.raw)[0];

  const highBalance = balance >= 75;
  const overallHigh = scores.every((s) => s.raw >= 70);
  const overallLow = scores.every((s) => s.raw < 55);

  if (overallHigh && highBalance) {
    return {
      title: "The Integrated Steward",
      archetype: "Rare — top decile inner architecture",
      summary:
        "Your inner architecture is coherent across all four constructs. You lead from a stable center: clear purpose, sustainable resilience, disciplined stewardship, and an appetite for growth.",
      guidance:
        "Your work now is to compound. Codify what you know so it survives you, and mentor the leaders who will inherit the systems you have built.",
    };
  }
  if (overallLow) {
    return {
      title: "The Leader in Formation",
      archetype: "Foundational — architecture under construction",
      summary:
        "The scaffolding of your leadership is still being built. This is a productive place to be if you treat it as a design problem rather than a verdict.",
      guidance:
        "Choose one construct to strengthen this quarter. Depth in one dimension will begin to lift the others.",
    };
  }

  const byKey: Record<ConstructKey, Profile> = {
    purpose: {
      title: "The Anchored Founder",
      archetype: "Purpose-led leader",
      summary:
        "Your clarity of purpose is the load-bearing wall of your leadership. Others feel it. Decisions flow from conviction rather than circumstance.",
      guidance:
        "Guard against purpose becoming rigidity. Invest in resilience and growth so your clarity is not brittle under pressure.",
    },
    resilience: {
      title: "The Composed Operator",
      archetype: "Resilience-led leader",
      summary:
        "You hold steady when others waver. Your regulation under pressure is a strategic asset the organization quietly depends on.",
      guidance:
        "Endurance without direction is expensive. Sharpen your purpose so your resilience is deployed toward what you most want to build.",
    },
    stewardship: {
      title: "The Trusted Custodian",
      archetype: "Stewardship-led leader",
      summary:
        "You treat what has been entrusted to you with real weight. People, capital, and reputation are safer because of how you hold them.",
      guidance:
        "Stewardship can quietly slide into over-control. Practice releasing what growth-oriented leaders around you can now carry.",
    },
    growth: {
      title: "The Adaptive Executive",
      archetype: "Growth-led leader",
      summary:
        "You learn faster than your context changes. That velocity is the reason you keep outgrowing your own job description.",
      guidance:
        "Growth without stewardship becomes churn. Build the systems and successors that let your learning compound in the organization.",
    },
  };

  return byKey[top.key];
}

export const STORAGE_KEY = "iad_answers_v1";