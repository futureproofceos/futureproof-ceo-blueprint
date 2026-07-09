import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CONSTRUCTS,
  QUESTIONS,
  STORAGE_KEY,
  scoreAssessment,
  type Answers,
  type PrimaryRisk,
  type RiskSeverity,
  type ScoreResult,
} from "@/lib/assessment";
import { ArrowLeft, Download, RotateCcw, TrendingUp, AlertTriangle, Sparkles, ShieldAlert, FileText } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Your results · Inner Architecture Diagnostic™" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
      else setAnswers({});
    } catch {
      setAnswers({});
    }
  }, []);

  const result = useMemo<ScoreResult | null>(
    () => (answers ? scoreAssessment(answers) : null),
    [answers],
  );

  if (!answers) return null;

  if (!result || result.confidence === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">No results yet</h1>
          <p className="mt-2 text-muted-foreground">Complete the diagnostic to see your inner architecture.</p>
          <div className="mt-6">
            <Link to="/assessment">
              <Button>Begin the diagnostic</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const radarData = result.scores.map((s) => ({
    subject: s.short,
    score: s.raw,
    fullMark: 100,
  }));

  const barData = result.scores.map((s) => ({
    name: s.short,
    value: s.raw,
    fill: CONSTRUCTS[s.key].color,
  }));

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    navigate({ to: "/assessment" });
  }

  function download() {
    const text = buildReport(result!);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inner-architecture-diagnostic.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/60 backdrop-blur">
        <div className="mx-auto grid max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" /> Home
            </Button>
          </Link>
          <p className="truncate text-center text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Your Diagnostic
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={reset} className="hidden sm:inline-flex">
              <RotateCcw className="mr-1 h-4 w-4" /> Retake
            </Button>
            <Button size="sm" onClick={download}>
              <Download className="mr-1 h-4 w-4" /> Report
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5">
        {/* Profile hero */}
        <section className="pt-10 sm:pt-16">
          <Badge variant="outline" className="border-primary/40 text-primary">
            {result.profile.archetype}
          </Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {result.profile.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {result.profile.summary}
          </p>
        </section>

        {/* Overall metrics */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Overall Structural Integrity"
            value={result.overall}
            hint="Mean of the three core load-bearing constructs"
            accent="var(--primary)"
          />
          <MetricCard
            label="Structural Coherence"
            value={result.coherence}
            hint="How evenly the core three carry the load"
            accent="var(--accent)"
          />
          <MetricCard
            label="Confidence Index"
            value={result.confidence}
            hint={`${Object.keys(answers).length} of ${QUESTIONS.length} items answered`}
            accent="var(--gold)"
          />
        </section>

        {/* Primary Structural Risk */}
        <section className="mt-8">
          <PrimaryRiskCard risk={result.primaryRisk} />
        </section>

        {/* Charts */}
        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <Card className="p-5 shadow-[var(--shadow-card)] sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Architecture radar
            </h3>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "var(--foreground)", fontSize: 12, fontWeight: 500 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                    stroke="var(--border)"
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 shadow-[var(--shadow-card)] sm:p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Construct scores
            </h3>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 8 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} stroke="var(--border)" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fill: "var(--foreground)", fontSize: 12, fontWeight: 500 }}
                    stroke="var(--border)"
                  />
                  <Tooltip
                    cursor={{ fill: "var(--secondary)" }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [`${v}/100`, "Score"]}
                  />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {barData.map((d, i) => (
                      <Cell key={i} fill={d.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* Construct breakdown */}
        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Construct breakdown
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {result.scores.map((s) => {
              const c = CONSTRUCTS[s.key];
              return (
                <Card key={s.key} className="p-5 shadow-[var(--shadow-card)]">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {tierLabel(s.raw)}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-3xl font-semibold tabular-nums tracking-tight" style={{ color: c.color }}>
                        {s.raw}
                      </div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${s.raw}%`, backgroundColor: c.color }}
                      />
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Coherence analysis */}
        <section className="mt-8">
          <Card className="p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Structural coherence</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {coherenceCopy(result.coherence)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-4xl font-semibold tabular-nums tracking-tight" style={{ color: "var(--accent)" }}>
                  {result.coherence}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Coherence</div>
              </div>
            </div>
            <div className="mt-5">
              <Progress value={result.coherence} className="h-1.5" />
            </div>
          </Card>
        </section>

        {/* Growth Readiness modifier */}
        <section className="mt-8">
          <Card
            className="p-6 shadow-[var(--shadow-card)] sm:p-8"
            style={{
              background: "color-mix(in oklab, var(--accent) 4%, var(--card))",
              borderColor: "color-mix(in oklab, var(--accent) 20%, var(--border))",
            }}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Developmental modifier
                </p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  Growth Readiness · {result.growthModifier.tier}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {result.growthModifier.recommendation}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:max-w-md">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Growth Readiness</p>
                    <p className="text-2xl font-semibold tabular-nums" style={{ color: "var(--accent)" }}>
                      {result.growthScore.raw}<span className="text-sm text-muted-foreground"> / 100</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Improvement potential</p>
                    <p className="text-2xl font-semibold tabular-nums" style={{ color: "var(--gold)" }}>
                      {result.improvementPotential}<span className="text-sm text-muted-foreground"> / 100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Strengths & risks */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: "var(--accent)" }} />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Load-bearing strengths
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {result.strengths.map((s) => (
                <li key={s.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{tierLabel(s.raw)}</p>
                  </div>
                  <span className="shrink-0 text-lg font-semibold tabular-nums" style={{ color: CONSTRUCTS[s.key].color }}>
                    {s.raw}
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Quiet risks
              </h3>
            </div>
            <ul className="mt-4 space-y-3">
              {result.risks.map((s) => (
                <li key={s.key} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{tierLabel(s.raw)}</p>
                  </div>
                  <span className="shrink-0 text-lg font-semibold tabular-nums" style={{ color: CONSTRUCTS[s.key].color }}>
                    {s.raw}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        {/* Guidance */}
        <section className="mt-8">
          <Card
            className="p-6 shadow-[var(--shadow-card)] sm:p-8"
            style={{
              background: "color-mix(in oklab, var(--primary) 4%, var(--card))",
              borderColor: "color-mix(in oklab, var(--primary) 20%, var(--border))",
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Where to focus next</h3>
            </div>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground">
              {result.profile.guidance}
            </p>
          </Card>
        </section>

        {/* Executive Interpretation */}
        <section className="mt-8">
          <Card className="p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Executive Interpretation
              </h3>
            </div>

            <div className="mt-6 space-y-8">
              <InterpretationBlock label="Executive Summary">
                <p className="text-sm leading-relaxed text-foreground">
                  {result.interpretation.executiveSummary}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Primary Strength">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  {result.interpretation.primaryStrength.construct}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.interpretation.primaryStrength.rationale}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.interpretation.primaryStrength.behaviour}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Development Priority">
                <p className="text-base font-semibold tracking-tight text-foreground">
                  {result.interpretation.developmentPriority.construct}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.interpretation.developmentPriority.rationale}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Pressure Response">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {result.interpretation.pressureResponse}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Growth Potential">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {result.interpretation.growthPotential}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Recommended Next Step">
                <p className="text-sm leading-relaxed text-foreground">
                  {result.interpretation.recommendedNextStep}
                </p>
              </InterpretationBlock>

              <InterpretationBlock label="Reflection Questions">
                <ol className="mt-1 list-decimal space-y-3 pl-5">
                  {result.interpretation.reflectionQuestions.map((q, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                      {q}
                    </li>
                  ))}
                </ol>
              </InterpretationBlock>
            </div>
          </Card>
        </section>

        <section className="mt-10 flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="mr-1 h-4 w-4" /> Retake diagnostic
          </Button>
          <Button onClick={download}>
            <Download className="mr-1 h-4 w-4" /> Download full report
          </Button>
        </section>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number;
  hint: string;
  accent: string;
}) {
  return (
    <Card className="p-5 shadow-[var(--shadow-card)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tabular-nums tracking-tight" style={{ color: accent }}>
          {value}
        </span>
        <span className="text-sm text-muted-foreground">/ 100</span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
    </Card>
  );
}

function tierLabel(v: number) {
  if (v >= 85) return "Exceptional";
  if (v >= 70) return "Strong";
  if (v >= 55) return "Developing";
  if (v >= 40) return "Emergent";
  return "Foundational";
}

function PrimaryRiskCard({ risk }: { risk: PrimaryRisk }) {
  const tone = riskTone(risk.severity);
  return (
    <Card
      className="p-6 shadow-[var(--shadow-card)] sm:p-8"
      style={{
        background: `color-mix(in oklab, ${tone.accent} 4%, var(--card))`,
        borderColor: `color-mix(in oklab, ${tone.accent} 28%, var(--border))`,
      }}
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4" style={{ color: tone.accent }} />
        <h3
          className="text-xs font-semibold uppercase tracking-[0.14em]"
          style={{ color: tone.accent }}
        >
          Primary Structural Risk
        </h3>
      </div>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {risk.name}
          </h2>
          {risk.detected ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {risk.description}
            </p>
          ) : (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {risk.description}
            </p>
          )}
        </div>
        {risk.detected && (
          <Badge
            variant="outline"
            className="shrink-0"
            style={{ borderColor: tone.accent, color: tone.accent }}
          >
            {risk.severity}
          </Badge>
        )}
      </div>
      {risk.detected && risk.recommendation && (
        <div className="mt-5 border-t border-border/60 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Recommendation
          </p>
          <p className="mt-1 text-sm leading-relaxed text-foreground">{risk.recommendation}</p>
        </div>
      )}
    </Card>
  );
}

function InterpretationBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border/60 pt-6 first:border-0 first:pt-0">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function riskTone(severity: RiskSeverity): { accent: string } {
  if (severity === "Critical") return { accent: "var(--destructive)" };
  if (severity === "High") return { accent: "var(--destructive)" };
  if (severity === "Moderate") return { accent: "var(--gold)" };
  return { accent: "var(--accent)" };
}

function coherenceCopy(v: number) {
  if (v >= 85)
    return "Your core architecture is exceptionally coherent. Purpose, resilience, and stewardship carry the load together — a signature of durable, integrated leadership.";
  if (v >= 70)
    return "Your core architecture is coherent. Minor asymmetries exist across the three load-bearing constructs but the structure holds under load.";
  if (v >= 55)
    return "There is meaningful asymmetry across the core three. One construct is quietly compensating for the others. Left unaddressed, this becomes brittle at scale.";
  return "Your architecture is significantly uneven. A dominant construct is carrying disproportionate load — impressive in the short run, unsustainable across cycles.";
}

function buildReport(r: ScoreResult) {
  const line = "=".repeat(64);
  const soft = "-".repeat(64);
  const now = new Date().toLocaleString();
  return [
    line,
    "  INNER ARCHITECTURE DIAGNOSTIC™",
    "  FutureProofCEOs · Research Report",
    `  Generated: ${now}`,
    line,
    "",
    `PROFILE: ${r.profile.title}`,
    `Archetype: ${r.profile.archetype}`,
    "",
    r.profile.summary,
    "",
    soft,
    "OVERALL METRICS",
    soft,
    `  Overall Structural Integrity : ${r.overall} / 100   (core three)`,
    `  Structural Coherence         : ${r.coherence} / 100`,
    `  Confidence Index             : ${r.confidence} / 100`,
    `  Growth Readiness (modifier)  : ${r.growthScore.raw} / 100  [${r.growthModifier.tier}]`,
    `  Improvement Potential        : ${r.improvementPotential} / 100`,
    "",
    soft,
    "PRIMARY STRUCTURAL RISK",
    soft,
    `  ${r.primaryRisk.name}`,
    ...(r.primaryRisk.detected
      ? [
          `  Severity: ${r.primaryRisk.severity}   (score gap: ${r.primaryRisk.gap})`,
          "",
          r.primaryRisk.description,
          "",
          `Recommendation: ${r.primaryRisk.recommendation}`,
        ]
      : [r.primaryRisk.description]),
    "",
    soft,
    "CONSTRUCT SCORES",
    soft,
    ...r.scores.map(
      (s) => `  ${s.name.padEnd(28)} ${String(s.raw).padStart(3)} / 100   (${tierLabel(s.raw)})`,
    ),
    "",
    soft,
    "LOAD-BEARING STRENGTHS",
    soft,
    ...r.strengths.map((s) => `  • ${s.name} — ${s.raw}/100 (${tierLabel(s.raw)})`),
    "",
    soft,
    "QUIET RISKS",
    soft,
    ...r.risks.map((s) => `  • ${s.name} — ${s.raw}/100 (${tierLabel(s.raw)})`),
    "",
    soft,
    "STRUCTURAL COHERENCE",
    soft,
    coherenceCopy(r.coherence),
    "",
    soft,
    "GROWTH READINESS MODIFIER",
    soft,
    r.growthModifier.recommendation,
    "",
    soft,
    "WHERE TO FOCUS NEXT",
    soft,
    r.profile.guidance,
    "",
    line,
    "  EXECUTIVE INTERPRETATION",
    line,
    "",
    "1. EXECUTIVE SUMMARY",
    soft,
    r.interpretation.executiveSummary,
    "",
    "2. PRIMARY STRENGTH",
    soft,
    `  ${r.interpretation.primaryStrength.construct}`,
    "",
    r.interpretation.primaryStrength.rationale,
    "",
    r.interpretation.primaryStrength.behaviour,
    "",
    "3. DEVELOPMENT PRIORITY",
    soft,
    `  ${r.interpretation.developmentPriority.construct}`,
    "",
    r.interpretation.developmentPriority.rationale,
    "",
    "4. PRESSURE RESPONSE",
    soft,
    r.interpretation.pressureResponse,
    "",
    "5. GROWTH POTENTIAL",
    soft,
    r.interpretation.growthPotential,
    "",
    "6. RECOMMENDED NEXT STEP",
    soft,
    r.interpretation.recommendedNextStep,
    "",
    "7. REFLECTION QUESTIONS",
    soft,
    ...r.interpretation.reflectionQuestions.map((q, i) => `  ${i + 1}. ${q}`),
    "",
    line,
    "  This is a research instrument. It is not a substitute for",
    "  professional or clinical advice.",
    line,
    "",
  ].join("\n");
}