"use client";

import { useEffect } from "react";
import { useMusic } from "@/components/music/music-provider";
import { SecretBackground } from "@/components/secret/secret-background";
import { SecretNav } from "@/components/secret/secret-nav";
import { SecretHero } from "@/components/secret/secret-hero";
import { SecretCard } from "@/components/secret/secret-card";
import { SecretGallery } from "@/components/secret/secret-gallery";
import { SecretPlaylist } from "@/components/secret/secret-playlist";
import { SecretTentang } from "@/components/secret/secret-tentang";
import { SecretFooter } from "@/components/secret/secret-footer";

export default function SecretClient() {
  const { playTrack } = useMusic();

  useEffect(() => {
    playTrack(1);
  }, [playTrack]);

  return (
    <main className="relative min-h-[100svh] overflow-x-clip">
      <SecretBackground />
      <SecretNav />
      <div className="relative z-10">
        <SecretHero />
        <SecretCard />
        <SecretGallery />
        <SecretPlaylist />
        <SecretTentang />
        <SecretFooter />
      </div>
    </main>
  );
}
