"use client";

import { useState } from "react";
import { Globe, Network, Server, Wifi, type LucideIcon } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { projects } from "@/lib/site";

const tabIcons: Record<string, LucideIcon> = {
  "Website Portofolio Ini": Globe,
  "Konfigurasi MikroTik Router": Wifi,
  "Lab Jaringan: VLAN & Inter-VLAN Routing": Network,
  "Server Linux & Layanan Jaringan": Server,
};

function ProjectImage({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl border border-border/40">
      {/* Glow effect behind image */}
      <div
        className="absolute -inset-1 opacity-20 blur-xl rounded-2xl"
        style={{ background: `radial-gradient(circle, ${project.color}40, transparent 70%)` }}
      />
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Status badge on image */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold backdrop-blur-md"
            style={{
              background: `${project.color}20`,
              color: project.color,
              border: `1px solid ${project.color}30`,
            }}
          >
            {project.status}
          </span>
        </div>
        {/* Platform badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold bg-black/40 text-white/80 backdrop-blur-md border border-white/10">
            {project.platform}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProject() {
  const [selected, setSelected] = useState<number | null>(0);
  const project = projects[selected ?? 0];

  const tabs = projects.map((p) => ({
    title: p.title,
    icon: tabIcons[p.title] ?? Globe,
  }));

  return (
    <div>
      <ExpandableTabs
        tabs={tabs}
        activeColor="text-volt-text"
        onChange={setSelected}
      />

      <div className="mt-8 overflow-hidden rounded-4xl border border-border bg-card relative">
        {/* Background glow */}
        <div
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: project.color }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: project.color }}
        />

        <div className="border-b border-border/60 bg-card/60 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
              proyek utama
            </p>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ background: project.color, opacity: 0.8 }} />
              <span className="size-1.5 rounded-full" style={{ background: project.color, opacity: 0.5 }} />
              <span className="size-1.5 rounded-full" style={{ background: project.color, opacity: 0.3 }} />
            </span>
          </div>
          <ProjectImage project={project} />
        </div>

        <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="rounded-full px-3 py-1 text-xs font-bold"
                style={{ background: project.color, color: "#000" }}
              >
                {project.platform}
              </span>
              <span className="rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium">
                {project.status}
              </span>
            </div>
            <h2 className="font-display mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          <div className="space-y-5 lg:col-span-7">
            {project.features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border/70 bg-background p-6 transition-all duration-500 hover:border-transparent relative overflow-hidden"
                style={{ ["--hover-color" as string]: `${project.color}30` }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${project.color}08, transparent 70%)` }}
                />
                <div className="flex flex-wrap items-center gap-3 relative">
                  <span
                    className="font-mono rounded-full px-2.5 py-0.5 text-[10px] tracking-widest uppercase border"
                    style={{ color: project.color, borderColor: `${project.color}40` }}
                  >
                    {f.kicker}
                  </span>
                  <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                    {f.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground relative">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
