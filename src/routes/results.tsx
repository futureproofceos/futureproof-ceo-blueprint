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
  type ScoreResult,
} from "@/lib/assessment";
import { ArrowLeft, Download, RotateCcw, TrendingUp, AlertTriangle, Sparkles } from "lucide-react";

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
            label="Overall Architecture"
            value={result.overall}
            hint="Weighted mean across all four constructs"
            accent="var(--primary)"
          />
          <MetricCard
            label="Structural Balance"
            value={result.balance}
            hint="How evenly the load is distributed"
            accent="var(--accent)"
          />
          <MetricCard
            label="Confidence Index"
            value={result.confidence}
            hint={`${Object.keys(answers).length} of ${QUESTIONS.length} items answered`}
            accent="var(--gold)"
          />
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

        {/* Balance analysis */}
        <section className="mt-8">
          <Card className="p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold tracking-tight text-foreground">Structural balance</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {balanceCopy(result.balance)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-4xl font-semibold tabular-nums tracking-tight" style={{ color: "var(--accent)" }}>
                  {result.balance}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Balance</div>
              </div>
            </div>
            <div className="mt-5">
              <Progress value={result.balance} className="h-1.5" />
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

function balanceCopy(v: number) {
  if (v >= 85)
    return "Your architecture is exceptionally balanced. No single construct is bearing the weight of the others. This is a sign of durable, integrated leadership.";
  if (v >= 70)
    return "Your architecture is well-balanced. Minor asymmetries exist but the structure holds under load.";
  if (v >= 55)
    return "There is meaningful asymmetry in your architecture. One or two constructs are quietly compensating for the others. Left unaddressed, this becomes brittle at scale.";
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
    `  Overall Architecture : ${r.overall} / 100`,
    `  Structural Balance   : ${r.balance} / 100`,
    `  Confidence Index     : ${r.confidence} / 100`,
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
    "STRUCTURAL BALANCE",
    soft,
    balanceCopy(r.balance),
    "",
    soft,
    "WHERE TO FOCUS NEXT",
    soft,
    r.profile.guidance,
    "",
    line,
    "  This is a research instrument. It is not a substitute for",
    "  professional or clinical advice.",
    line,
    "",
  ].join("\n");
}