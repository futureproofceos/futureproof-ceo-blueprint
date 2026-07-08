import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONSTRUCTS } from "@/lib/assessment";
import { ArrowRight, Compass, Shield, Landmark, Sprout, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const ICONS = {
  purpose: Compass,
  resilience: Shield,
  stewardship: Landmark,
  growth: Sprout,
} as const;

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold tracking-tight">FC</div>
            <span className="text-sm font-semibold tracking-tight text-foreground">FutureProofCEOs</span>
          </div>
          <Link to="/assessment">
            <Button size="sm" variant="outline" className="hidden sm:inline-flex">Begin diagnostic</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              A FutureProofCEOs research instrument
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              The Inner Architecture{" "}
              <span className="text-primary">Diagnostic™</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A 12-minute, research-grade assessment for CEOs and organizational
              leaders. Measure the four load-bearing constructs behind durable
              leadership — and see where your architecture holds, and where it
              is quietly under strain.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/assessment">
                <Button size="lg" className="h-12 px-6 text-base shadow-[var(--shadow-elevated)]">
                  Begin the diagnostic
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" style={{ color: "var(--accent)" }} />
                44 questions · anonymous · no signup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four constructs */}
      <section className="border-t border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The Four Architectures
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              What we measure
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every founder eventually meets the ceiling of their own inner
              structure. The diagnostic examines the four dimensions that
              determine how high — and how well — that ceiling holds.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {(Object.values(CONSTRUCTS)).map((c) => {
              const Icon = ICONS[c.key];
              return (
                <Card key={c.key} className="p-6 shadow-[var(--shadow-card)]">
                  <div className="flex items-start gap-4">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${c.color} 12%, transparent)`,
                        color: c.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-3">
            <Stat k="44" label="Validated items across four constructs" />
            <Stat k="4" label="Load-bearing architectures scored 0–100" />
            <Stat k="12 min" label="Median completion time for a CEO" />
          </div>

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              What you receive
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              A structural read on how you lead.
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Radar and bar visualizations across all four architectures",
                "Structural balance analysis — where the load is uneven",
                "Your leadership profile and archetype",
                "Confidence index for the reliability of your result",
                "Named strengths and quiet risks",
                "A downloadable report you can revisit each quarter",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/assessment">
                <Button size="lg" className="h-12 px-6">
                  Begin the diagnostic
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} FutureProofCEOs · Inner Architecture Diagnostic™</p>
          <p>A research instrument. Not a substitute for professional advice.</p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">{k}</div>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
