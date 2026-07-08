import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  CONSTRUCTS,
  LIKERT,
  QUESTIONS,
  STORAGE_KEY,
  type Answers,
} from "@/lib/assessment";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Diagnostic · Inner Architecture Diagnostic™" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AssessmentPage,
});

function AssessmentPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);

  const q = QUESTIONS[index];
  const construct = CONSTRUCTS[q.construct];
  const current = answers[q.id];
  const progress = useMemo(
    () => ((index + (current ? 1 : 0)) / QUESTIONS.length) * 100,
    [index, current],
  );
  const answeredCount = Object.keys(answers).length;

  function select(value: number) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
    // auto-advance
    window.setTimeout(() => {
      if (index < QUESTIONS.length - 1) setIndex((i) => i + 1);
    }, 220);
  }

  function back() {
    if (index > 0) setIndex((i) => i - 1);
  }

  function next() {
    if (index < QUESTIONS.length - 1) setIndex((i) => i + 1);
  }

  function finish() {
    navigate({ to: "/results" });
  }

  const isLast = index === QUESTIONS.length - 1;
  const allAnswered = answeredCount === QUESTIONS.length;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Progress header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto max-w-2xl px-5 py-4">
          <div className="mb-2 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs">
            <span className="truncate font-medium uppercase tracking-[0.14em]" style={{ color: construct.color }}>
              {construct.name}
            </span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {index + 1} / {QUESTIONS.length}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-5 py-10 sm:py-16">
          <Card key={q.id} className="p-6 shadow-[var(--shadow-card)] sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Statement {index + 1}
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
              {q.text}
            </h2>

            <div className="mt-8 space-y-2.5">
              {LIKERT.map((opt) => {
                const active = current === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => select(opt.value)}
                    className={`group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all ${
                      active
                        ? "border-primary bg-primary/[0.04] shadow-[var(--shadow-card)]"
                        : "border-border bg-card hover:border-primary/40 hover:bg-secondary/60"
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] font-semibold tabular-nums ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {active ? <Check className="h-3.5 w-3.5" /> : opt.value}
                    </span>
                    <span className={`min-w-0 text-sm ${active ? "font-medium text-foreground" : "text-foreground/85"}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Nav */}
          <div className="mt-6 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={back}
              disabled={index === 0}
              className="text-muted-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <span className="truncate text-center text-xs text-muted-foreground">
              {answeredCount} of {QUESTIONS.length} answered
            </span>
            {isLast ? (
              <Button size="sm" onClick={finish} disabled={!allAnswered && !current}>
                See results <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={next} disabled={!current}>
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>

          {allAnswered && !isLast && (
            <div className="mt-6 rounded-lg border border-primary/30 bg-primary/[0.04] p-4 text-center">
              <p className="text-sm text-foreground">All statements answered.</p>
              <Button className="mt-3" size="sm" onClick={finish}>
                See your results <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}