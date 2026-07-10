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
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground text-xs font-bold tracking-tight">FC</div>
            <span className="text-sm font-semibold tracking-tight text-foreground">FutureProofCEOs</span>
          </div>
          <Link to="/assessment">
            <Button size="sm" variant="outline" className="hidden sm:inline-flex">Start Diagnostic</Button>
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
        <div className="relative mx-auto max-w-[1200px] px-6 pt-24 pb-28 sm:px-8 sm:pt-36 sm:pb-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
              A FutureProofCEOs research instrument
            </div>
            <h1 className="mt-8 text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-[4.5rem]">
              The Inner Architecture{" "}
              <span className="text-primary">Diagnostic™</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              A 12-minute, research-grade assessment for CEOs. Measure the four constructs behind durable leadership.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link to="/assessment">
                <Button size="lg" className="h-12 px-6 text-base shadow-[var(--shadow-elevated)]">
                  Start Diagnostic
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
        <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              The Framework
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Three Core Architectures. One Developmental Indicator.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Purpose, Resilience and Legacy are the three load-bearing architectures of durable leadership. The Growth Readiness Index is a developmental modifier — it governs how quickly the three core architectures can strengthen and personalises the recommendations you receive.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {(Object.values(CONSTRUCTS)).map((c) => {
              const Icon = ICONS[c.key];
              const isCore = c.key !== "growth";
              return (
                <Card key={c.key} className="card-hover p-8 shadow-[var(--shadow-card)]">
                  <div className="flex items-start gap-5">
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-lg"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${c.color} 12%, transparent)`,
                        color: c.color,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        {isCore ? "Core Architecture" : "Developmental Indicator"}
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {c.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="mt-10 rounded-xl border border-border/70 bg-card/60 p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>
              Theoretical Foundation
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              Identity Foundation
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Purpose, Resilience and Legacy rest upon a deeper Identity Foundation — the sense of self from which they are expressed. In Research Beta Version 1, Identity Foundation is the theoretical bedrock of the framework and is not directly measured; a dedicated Identity Foundation module is on the FutureProofCEOs research roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section>
        <div className="mx-auto max-w-[1200px] px-6 py-24 sm:px-8 sm:py-32">
          <div className="grid gap-12 sm:grid-cols-3">
            <Stat k="44" label="Validated items" />
            <Stat k="4" label="Architectures scored 0–100" />
            <Stat k="12 min" label="Median completion" />
          </div>

          <div className="card-hover mt-24 rounded-2xl border border-border bg-card p-10 shadow-[var(--shadow-card)] sm:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--accent)" }}>
              What you receive
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
              A structural read on how you lead.
            </h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                "Radar and bar visualizations across four architectures",
                "Structural balance analysis",
                "Leadership profile and archetype",
                "Confidence index",
                "Named strengths and quiet risks",
                "Downloadable quarterly report",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <Link to="/assessment">
                <Button size="lg" className="h-12 px-6">
                  Start Diagnostic
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
            <div>
              <p className="text-base font-semibold tracking-tight text-foreground">FutureProofCEOs</p>
              <p className="mt-1 text-sm text-muted-foreground">Inner Architecture Institute™</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Research Beta v1.0</p>
            </div>
            <p className="text-xs text-muted-foreground sm:text-right">
              © {new Date().getFullYear()} FutureProofCEOs · A research instrument.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div>
      <div className="text-5xl font-semibold tracking-tight text-primary sm:text-6xl">{k}</div>
      <p className="mt-3 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
