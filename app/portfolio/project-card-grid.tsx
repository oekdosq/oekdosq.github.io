"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/lib/site";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <div className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-500 hover:border-transparent">
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${project.color}10, transparent 60%)`,
          }}
        />
        {/* Top glow bar on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
        />

        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          {/* Status on image */}
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase font-bold backdrop-blur-md"
              style={{
                background: `${project.color}15`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {project.status}
            </span>
          </div>
          {/* Arrow */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: `${project.color}20`, border: `1px solid ${project.color}30` }}
            >
              <ArrowUpRight className="size-3.5" style={{ color: project.color }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span
              className="font-mono rounded-full px-2.5 py-1 text-[10px] tracking-widest uppercase border"
              style={{ color: project.color, borderColor: `${project.color}30` }}
            >
              {project.platform}
            </span>
          </div>
          <h3 className="font-display text-lg font-bold tracking-tight leading-snug">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.summary}
          </p>
          {/* Feature pills */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.features.map((f) => (
              <span
                key={f.kicker}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wider uppercase bg-muted/50 text-muted-foreground"
              >
                {f.kicker}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ProjectCardGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </div>
  );
}
