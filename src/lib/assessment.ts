export type ConstructKey = "purpose" | "resilience" | "stewardship" | "growth";

export const IDENTITY_FOUNDATION = {
  title: "Identity Foundation",
  short:
    "Identity Foundation is the theoretical bedrock of the model — the sense of self from which Purpose, Resilience and Legacy are expressed.",
  interpretation:
    "Identity Foundation refers to the underlying sense of self from which Purpose is expressed, Resilience is sustained, and Legacy is built. It is the upstream construct that shapes how each of the three core architectures shows up in behaviour, but it is not itself measured in Research Beta Version 1. This beta focuses on the three load-bearing architectures because their behavioural signals are stable enough to measure reliably. Identity Foundation operates one layer above behaviour and requires its own instrumentation, which the FutureProofCEOs Institute is actively developing. Treat your results as an accurate read on the structures identity produces, and treat Identity itself as the next layer of inquiry rather than a gap in this report.",
  roadmap:
    "A dedicated Identity Foundation module is on the FutureProofCEOs research roadmap for a future release of the Inner Architecture Diagnostic™.",
} as const;

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
    name: "Legacy Architecture",
    short: "Legacy",
    description:
      "The extent to which you intentionally create enduring value through people, systems, institutions, culture and succession that continue beyond your direct involvement.",
    color: "var(--gold)",
    cssVar: "--gold",
  },
  growth: {
    key: "growth",
    name: "Growth Readiness Index",
    short: "Growth Index",
    description:
      "A developmental modifier indicating openness to learning, adaptability and coaching readiness. It shapes recommendations but is not a core architecture.",
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
  coreScores: ConstructScore[];
  growthScore: ConstructScore;
  overall: number;
  confidence: number; // 0–100
  coherence: number;  // 0–100 (100 = perfectly coherent across core three)
  improvementPotential: number; // 0–100 — derived from Growth Readiness + headroom
  profile: Profile;
  strengths: ConstructScore[];
  risks: ConstructScore[];
  growthModifier: GrowthModifier;
  primaryRisk: PrimaryRisk;
  interpretation: ExecutiveInterpretation;
}

export interface Profile {
  title: string;
  archetype: string;
  summary: string;
  guidance: string;
}

export interface GrowthModifier {
  tier: "High" | "Moderate" | "Emerging";
  label: string;
  recommendation: string;
}

export type RiskSeverity = "Moderate" | "High" | "Critical" | "None";

export interface PrimaryRisk {
  name: string;
  severity: RiskSeverity;
  gap: number;
  description: string;
  recommendation: string;
  detected: boolean;
}

export interface ExecutiveInterpretation {
  executiveSummary: string;
  primaryStrength: {
    construct: string;
    rationale: string;
    behaviour: string;
  };
  developmentPriority: {
    construct: string;
    rationale: string;
  };
  pressureResponse: string;
  growthPotential: string;
  recommendedNextStep: string;
  reflectionQuestions: string[];
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

  // Overall Structural Integrity: mean of the three core load-bearing constructs.
  // Growth Readiness is intentionally excluded — it modifies development, not structure.
  const coreScores = scores.filter((s) => s.key !== "growth");
  const growthScore = scores.find((s) => s.key === "growth")!;
  const overall = Math.round(
    coreScores.reduce((a, s) => a + s.raw, 0) / coreScores.length,
  );

  // Structural Coherence: 100 - normalized standard deviation across the core three.
  const mean = overall;
  const variance =
    coreScores.reduce((a, s) => a + Math.pow(s.raw - mean, 2), 0) / coreScores.length;
  const sd = Math.sqrt(variance);
  const coherence = Math.max(0, Math.round(100 - sd * 2.2));

  const confidence = Math.round((totalAnswered / totalItems) * 100);

  const sorted = [...coreScores].sort((a, b) => b.raw - a.raw);
  const strengths = sorted.slice(0, 2);
  const risks = [...sorted].reverse().slice(0, 2);

  const growthModifier = deriveGrowthModifier(growthScore.raw);
  // Improvement potential = headroom on the core × growth readiness.
  const headroom = 100 - overall;
  const improvementPotential = Math.round((headroom * growthScore.raw) / 100);

  const profile = deriveProfile(coreScores, coherence, growthScore.raw);

  const purpose = coreScores.find((s) => s.key === "purpose")!.raw;
  const resilience = coreScores.find((s) => s.key === "resilience")!.raw;
  const stewardship = coreScores.find((s) => s.key === "stewardship")!.raw;
  const growth = growthScore.raw;
  const primaryRisk = derivePrimaryRisk({ purpose, resilience, stewardship, growth });

  const interpretation = deriveInterpretation({
    coreScores,
    growthScore,
    overall,
    coherence,
    primaryRisk,
  });

  return {
    scores,
    coreScores,
    growthScore,
    overall,
    confidence,
    coherence,
    improvementPotential,
    profile,
    strengths,
    risks,
    growthModifier,
    primaryRisk,
    interpretation,
  };
}

function severityFromGap(gap: number): RiskSeverity {
  if (gap > 30) return "Critical";
  if (gap >= 21) return "High";
  return "Moderate"; // gaps that trigger a rule but are ≤ 20
}

function severityRank(s: RiskSeverity): number {
  return s === "Critical" ? 3 : s === "High" ? 2 : s === "Moderate" ? 1 : 0;
}

export function derivePrimaryRisk(scores: {
  purpose: number;
  resilience: number;
  stewardship: number;
  growth: number;
}): PrimaryRisk {
  const { purpose, resilience, stewardship, growth } = scores;
  const candidates: PrimaryRisk[] = [];

  // Rule 1 — Mission Fatigue
  if (purpose >= 80 && resilience <= 60) {
    const gap = purpose - resilience;
    candidates.push({
      name: "Mission Fatigue",
      severity: severityFromGap(gap),
      gap,
      description:
        "Your vision is stronger than your recovery systems. Sustained pressure may eventually reduce judgment, energy and effectiveness.",
      recommendation: "Build recovery rhythms before expanding responsibility.",
      detected: true,
    });
  }

  // Rule 2 — Shiny Object Drift
  if (growth >= 80 && purpose <= 60) {
    const gap = growth - purpose;
    candidates.push({
      name: "Shiny Object Drift",
      severity: severityFromGap(gap),
      gap,
      description:
        "You have a strong desire to grow but insufficient long-term direction. This increases the likelihood of pursuing opportunities that do not align with your purpose.",
      recommendation: "Clarify your mission before pursuing additional opportunities.",
      detected: true,
    });
  }

  // Rule 3 — Institutional Rigidity
  if (stewardship >= 80 && growth <= 60) {
    const gap = stewardship - growth;
    candidates.push({
      name: "Institutional Rigidity",
      severity: severityFromGap(gap),
      gap,
      description:
        "You build stable systems but may resist learning and adaptation.",
      recommendation: "Increase feedback, experimentation and continuous learning.",
      detected: true,
    });
  }

  // Rule 4 — High Performer Trap
  if (purpose >= 80 && resilience >= 80 && stewardship <= 60) {
    const gap = Math.min(purpose, resilience) - stewardship;
    candidates.push({
      name: "High Performer Trap",
      severity: severityFromGap(gap),
      gap,
      description:
        "You perform well personally but your impact depends too heavily on your own effort.",
      recommendation: "Focus on delegation, multiplication and institution building.",
      detected: true,
    });
  }

  // Rule 5 — Efficient but Directionless
  if (purpose <= 60 && resilience >= 75) {
    const gap = resilience - purpose;
    candidates.push({
      name: "Efficient but Directionless",
      severity: severityFromGap(gap),
      gap,
      description:
        "You perform consistently under pressure but lack a compelling long-term direction.",
      recommendation: "Clarify purpose before increasing activity.",
      detected: true,
    });
  }

  if (candidates.length === 0) {
    return {
      name: "No significant structural risk detected.",
      severity: "None",
      gap: 0,
      description:
        "No combination of scores currently indicates a primary structural risk. Continue reinforcing the core three and revisit as your context changes.",
      recommendation: "",
      detected: false,
    };
  }

  // Highest severity wins; tiebreak by largest gap.
  candidates.sort((a, b) => {
    const s = severityRank(b.severity) - severityRank(a.severity);
    return s !== 0 ? s : b.gap - a.gap;
  });
  return candidates[0];
}

function deriveGrowthModifier(growth: number): GrowthModifier {
  if (growth >= 70)
    return {
      tier: "High",
      label: "High developmental velocity",
      recommendation:
        "Growth Readiness is high. Improvements to the core three will compound quickly — pursue an ambitious 90-day plan.",
    };
  if (growth >= 50)
    return {
      tier: "Moderate",
      label: "Moderate developmental velocity",
      recommendation:
        "Growth Readiness is moderate. Pair each core-construct intervention with one deliberate learning practice to accelerate uptake.",
    };
  return {
    tier: "Emerging",
    label: "Emerging developmental velocity",
    recommendation:
      "Growth Readiness is the rate-limiter. Before restructuring the core, invest in feedback loops, mentorship, and reflection — otherwise gains will not stick.",
  };
}

function deriveProfile(coreScores: ConstructScore[], coherence: number, _growth: number): Profile {
  const top = [...coreScores].sort((a, b) => b.raw - a.raw)[0];

  const highCoherence = coherence >= 75;
  const overallHigh = coreScores.every((s) => s.raw >= 70);
  const overallLow = coreScores.every((s) => s.raw < 55);

  if (overallHigh && highCoherence) {
    return {
      title: "The Integrated Steward",
      archetype: "Rare — top decile inner architecture",
      summary:
        "Your inner architecture is coherent across the three load-bearing constructs. You lead from a stable center: clear purpose, sustainable resilience, and disciplined stewardship.",
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

  const byKey: Record<Exclude<ConstructKey, "growth">, Profile> = {
    purpose: {
      title: "The Anchored Founder",
      archetype: "Purpose-led leader",
      summary:
        "Your clarity of purpose is the load-bearing wall of your leadership. Others feel it. Decisions flow from conviction rather than circumstance.",
      guidance:
        "Guard against purpose becoming rigidity. Invest in resilience so your clarity is not brittle under pressure.",
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
  };

  return byKey[top.key as Exclude<ConstructKey, "growth">];
}

export const STORAGE_KEY = "iad_answers_v1";

// ---------- Executive Interpretation ----------

type Band = "high" | "moderate" | "low";

function band(v: number): Band {
  if (v >= 70) return "high";
  if (v >= 55) return "moderate";
  return "low";
}

function integrityBand(v: number): "high" | "solid" | "developing" | "foundational" {
  if (v >= 80) return "high";
  if (v >= 65) return "solid";
  if (v >= 50) return "developing";
  return "foundational";
}

const STRENGTH_BEHAVIOUR: Record<Exclude<ConstructKey, "growth">, string> = {
  purpose:
    "In practice this shows up as decisive prioritisation, calm refusal of off-mission opportunities, and an organising narrative that others can repeat without prompting.",
  resilience:
    "In practice this shows up as steady judgment when the room destabilises, faster recovery from setbacks, and a composure that quietly regulates the people around you.",
  stewardship:
    "In practice this shows up as careful protection of people and capital, disciplined follow-through on commitments, and decisions that account for second- and third-order effects.",
};

const DEV_RATIONALE: Record<Exclude<ConstructKey, "growth">, string> = {
  purpose:
    "Strengthening purpose gives every other capacity a direction to serve. Without it, resilience becomes endurance for its own sake and stewardship narrows into maintenance.",
  resilience:
    "Strengthening resilience protects the quality of your judgment across cycles. Without it, purpose becomes brittle and stewardship absorbs stress it was not designed to carry.",
  stewardship:
    "Strengthening stewardship converts personal performance into institutional durability. Without it, purpose and resilience remain dependent on your continued presence.",
};

function deriveInterpretation(input: {
  coreScores: ConstructScore[];
  growthScore: ConstructScore;
  overall: number;
  coherence: number;
  primaryRisk: PrimaryRisk;
}): ExecutiveInterpretation {
  const { coreScores, growthScore, overall, coherence, primaryRisk } = input;
  const sorted = [...coreScores].sort((a, b) => b.raw - a.raw);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];
  const topKey = top.key as Exclude<ConstructKey, "growth">;
  const bottomKey = bottom.key as Exclude<ConstructKey, "growth">;

  const purpose = coreScores.find((s) => s.key === "purpose")!.raw;
  const resilience = coreScores.find((s) => s.key === "resilience")!.raw;
  const stewardship = coreScores.find((s) => s.key === "stewardship")!.raw;
  const growth = growthScore.raw;

  // ---------- Executive summary (120–180 words) ----------
  const iBand = integrityBand(overall);
  const coherenceLine =
    coherence >= 80
      ? "The three load-bearing architectures move together, which is what allows leaders to remain the same person in calm and in crisis."
      : coherence >= 65
        ? "The three architectures are broadly aligned, though one is quietly carrying more of the load than the others."
        : "There is meaningful asymmetry across the three architectures — a signature that often produces strong short-term performance and slower institutional durability.";

  const leadingLine = {
    purpose:
      "Your leadership tends to be organised by conviction: decisions are filtered through what you believe the work is ultimately for.",
    resilience:
      "Your leadership tends to be organised by composure: you regulate the emotional temperature of the room before you act on it.",
    stewardship:
      "Your leadership tends to be organised by responsibility: you feel the weight of what has been entrusted to you and act to protect it.",
  }[topKey];

  const pressureLine =
    resilience >= 70 && purpose >= 70
      ? "Under pressure you are likely to hold both direction and composure, which lets others borrow stability from you."
      : resilience >= 70
        ? "Under pressure you hold steady, though without a strong enough anchor of purpose that composure can drift into reactive execution."
        : purpose >= 70
          ? "Under pressure you know where you are heading, but the physiological cost of holding that line may quietly accumulate."
          : "Under pressure the current architecture is likely to strain — clarity narrows and recovery time lengthens before either is consciously noticed.";

  const trailingLine =
    growth >= 70
      ? "Openness to feedback is a genuine asset; the raw material for change is present."
      : growth >= 55
        ? "There is moderate openness to feedback, which means change is possible but requires deliberate structure to compound."
        : "Openness to feedback is currently the rate-limiter; without it, even good interventions tend not to stick.";

  const integrityLine = {
    high: "The overall architecture is durable and can be built upon rather than repaired.",
    solid: "The overall architecture is solid but has clear places where load is unevenly distributed.",
    developing: "The overall architecture is still consolidating; this is a formative rather than a fixed picture.",
    foundational:
      "The overall architecture is early in its formation, which is a productive place to lead from when treated as a design problem rather than a verdict.",
  }[iBand];

  const executiveSummary = [
    leadingLine,
    coherenceLine,
    pressureLine,
    integrityLine,
    trailingLine,
  ].join(" ");

  // ---------- Primary strength ----------
  const primaryStrength = {
    construct: top.name,
    rationale: `${top.name} is the most developed of your three load-bearing architectures. It is the capacity others are most likely to rely on when the environment becomes uncertain, and it forms the platform the rest of your leadership currently rests on.`,
    behaviour: STRENGTH_BEHAVIOUR[topKey],
  };

  // ---------- Development priority ----------
  const developmentPriority = {
    construct: bottom.name,
    rationale: `${bottom.name} is the shortest wall in your current architecture. Because Structural Integrity is bounded by its weakest load-bearer, targeted investment here typically produces disproportionate lift in how the whole system behaves under load. ${DEV_RATIONALE[bottomKey]}`,
  };

  // ---------- Pressure response ----------
  let pressureResponse: string;
  if (resilience >= 70 && purpose >= 70 && stewardship >= 70) {
    pressureResponse =
      "During prolonged uncertainty you are likely to become a stabilising centre for the people around you: direction stays legible, composure remains available, and the systems you have built continue to function. The risk to watch is quiet over-extension — being the person who holds everything together can obscure your own accumulating cost.";
  } else if (resilience <= 60 && purpose >= 70) {
    pressureResponse =
      "During prolonged uncertainty you are likely to keep pushing toward the mission after your recovery systems have begun to run down. Judgment usually holds longer than energy does, so the earliest warning signs will show up in irritability, sleep, and the shortening of your patience with people you care about — not in the strategic decisions themselves.";
  } else if (purpose <= 60 && resilience >= 70) {
    pressureResponse =
      "During prolonged uncertainty you are likely to keep functioning at a high level of execution, but without a strong enough anchor of purpose that effort can quietly become activity for its own sake. The risk is efficient motion in a direction you have not recently examined.";
  } else if (stewardship <= 60 && purpose >= 70 && resilience >= 70) {
    pressureResponse =
      "During prolonged uncertainty you are likely to carry more of the operational load yourself rather than distribute it. Personal performance stays high; institutional durability quietly does not keep pace.";
  } else if (growth <= 55) {
    pressureResponse =
      "During prolonged uncertainty the most likely constraint is a narrowing of the range of inputs you take seriously. Under load, feedback that would normally reach you tends to be filtered out, which can make the situation appear more stable than it is.";
  } else {
    pressureResponse =
      "During prolonged uncertainty your leadership is likely to hold together, but with visible asymmetry: one architecture will carry the weight while the others recede. Naming which one is being asked to do most is the first act of protection.";
  }

  // ---------- Growth potential ----------
  let growthPotential: string;
  if (growth > 80) {
    growthPotential =
      "Growth Readiness is high. You already run the feedback loops, mentorship, and reflective practice that make change stick, which means targeted coaching is likely to produce rapid, compounding improvement — often faster than you expect.";
  } else if (growth >= 60) {
    growthPotential =
      "Growth Readiness is in the working range. Development is genuinely available to you, but it will require intentional practice — structured feedback, a small number of deliberate experiments, and someone whose opinion you trust to hold up a mirror.";
  } else {
    growthPotential =
      "Growth Readiness is currently the first thing to strengthen. Before restructuring any of the load-bearing architectures, invest in the mindset side: honest feedback loops, protected time for reflection, and a willingness to update beliefs you have held for a long time.";
  }

  // ---------- Recommended next step ----------
  const riskClause = primaryRisk.detected
    ? ` while remaining alert to the pattern of ${primaryRisk.name.toLowerCase()}, which your current profile is most exposed to`
    : "";
  const recommendedNextStep = `Over the next 90 days, run one focused build on ${bottom.name.toLowerCase()} and deliberately deploy your ${top.name.toLowerCase()} to protect the process${riskClause}. Concretely: use the discipline your ${top.short.toLowerCase()} already provides to install a small, repeatable practice inside ${bottom.short.toLowerCase()} — one that happens on a schedule rather than only when convenient — and review it monthly with someone whose feedback you cannot dismiss.`;

  // ---------- Reflection questions ----------
  const reflectionQuestions: string[] = [];
  reflectionQuestions.push(
    `Where in the last quarter did your ${top.short.toLowerCase()} do work that ${bottom.short.toLowerCase()} should have been doing — and what did that quietly cost?`,
  );
  if (primaryRisk.detected) {
    reflectionQuestions.push(
      `If the pattern of "${primaryRisk.name}" were fully visible to the people closest to you, what would they say they have been absorbing on your behalf?`,
    );
  } else if (band(resilience) === "low") {
    reflectionQuestions.push(
      "What is the earliest, most reliable signal that tells you your recovery systems are running down — and who else can see it before you do?",
    );
  } else {
    reflectionQuestions.push(
      "Which part of your leadership currently depends on you being present for it to function — and what would it take for that to no longer be true?",
    );
  }
  if (growth < 60) {
    reflectionQuestions.push(
      "What is a belief about your leadership you have held for more than three years that you have not seriously examined recently?",
    );
  } else {
    reflectionQuestions.push(
      `Three years from now, if ${bottom.name.toLowerCase()} were your strongest architecture rather than your weakest, what would you be doing differently on a Tuesday morning?`,
    );
  }

  return {
    executiveSummary,
    primaryStrength,
    developmentPriority,
    pressureResponse,
    growthPotential,
    recommendedNextStep,
    reflectionQuestions,
  };
}