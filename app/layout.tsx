import type { Metadata } from "next";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MusicProvider } from "@/components/music/music-provider";
import { MusicPlayer } from "@/components/music/music-player";
import { SiteChrome } from "@/components/site-chrome";
import { InlineScript } from "@/components/inline-script";
import { ThemeScene } from "@/components/theme-scene";

const geistMono = { variable: "--font-geist-mono" };

const themeScript = `(function(){var root=document.documentElement;function apply(){var t=null,d;try{t=localStorage.getItem('theme');}catch(e){}if(t){d=t==='dark';}else{try{d=!window.matchMedia('(prefers-color-scheme: light)').matches;}catch(e){d=true;}}root.classList.toggle('dark',d);var n=document.querySelector('.scene-night'),y=document.querySelector('.scene-day');if(n){n.style.opacity=d?'1':'0';}if(y){y.style.opacity=d?'0':'1';}}apply();document.addEventListener('DOMContentLoaded',apply);})();`;

export const metadata: Metadata = {
  title: {
    default: "Dyland · Siswa TJKT",
    template: "%s · Dyland",
  },
  description:
    "Portfolio Dyland Prizki Ramadhan , siswa TJKT yang suka mencoba hal baru: jaringan komputer, Linux, server, dan teknologi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <ThemeScene />
          <MusicProvider>
            <SiteChrome>
              <main className="relative z-10 flex w-full max-w-full flex-1 flex-col overflow-x-hidden">
                {children}
              </main>
            </SiteChrome>
            <MusicPlayer />
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
