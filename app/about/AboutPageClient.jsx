"use client";

import { useState, useEffect, useCallback } from "react";
import AboutSection from "../components/AboutSection";
import TechSkillSection from "../components/TechSkillSection";
import MovingTextBg from "../components/MovingTextBg";
import BackendStatusCard from "../components/BackendStatusCard";
import { getAboutContent } from "@/lib/api";

export default function AboutPageClient({ initialData }) {
  const [aboutData, setAboutData] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [isError, setIsError] = useState(false);

  const loadAbout = useCallback(async (force = false) => {
    if (!force && initialData) return;
    setLoading(true);
    setIsError(false);
    try {
      const data = await getAboutContent({ forceReload: force });
      if (data && typeof data === "object" && data.profile) {
        setAboutData(data);
        setIsError(false);
      } else {
        setAboutData(null);
        setIsError(true);
      }
    } catch {
      setAboutData(null);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData) {
      loadAbout();
    }
  }, [initialData, loadAbout]);

  const profile = aboutData?.profile || initialData?.profile || {};
  const stats = aboutData?.stats || initialData?.stats || [];
  const blocks = aboutData?.blocks || initialData?.blocks || [];

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen">
      <MovingTextBg text="ABOUT US" textColor="text-zinc-400">
        {/* Left-Aligned Hero Title Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-8 lg:pb-12 px-4 sm:px-8 lg:px-16 border-b border-zinc-200/80">
          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            {loading ? (
              <div className="animate-pulse space-y-4 max-w-3xl">
                <div className="w-32 h-7 bg-zinc-200 rounded-full" />
                <div className="w-3/4 h-16 bg-zinc-200 rounded-xl" />
                <div className="w-1/2 h-8 bg-zinc-100 rounded-lg" />
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                  <span>{profile.hero_badge || "01 - About Us"}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-zinc-900 max-w-4xl">
                  {profile.hero_title ? (
                    profile.hero_title.includes("&") ? (
                      <>
                        {profile.hero_title.split("&")[0].trim()} <br />
                        <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2 mt-2 rounded-sm border border-indigo-200/60">
                          & {profile.hero_title.split("&")[1].trim()}
                        </span>
                      </>
                    ) : (
                      profile.hero_title
                    )
                  ) : (
                    <>
                      About the <br />
                      <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2 mt-2 rounded-sm border border-indigo-200/60">
                        Studio & Founder
                      </span>
                    </>
                  )}
                </h1>

                <div className="max-w-2xl text-left pt-4">
                  <p className="text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed">
                    {profile.hero_subtitle ||
                      "Driven by engineering excellence, built with clarity, and crafted for long-term digital impact."}
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Dynamic About Content Bento Grid */}
        {loading ? (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-12 gap-4 sm:gap-6 animate-pulse">
              <div className="col-span-12 md:col-span-6 h-64 bg-zinc-200/70 rounded-3xl" />
              <div className="col-span-12 md:col-span-6 h-64 bg-zinc-900/60 rounded-3xl" />
              <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-28 bg-zinc-200/60 rounded-3xl" />
                ))}
              </div>
              <div className="col-span-12 h-64 bg-zinc-900/60 rounded-3xl" />
              <div className="col-span-12 md:col-span-6 h-48 bg-zinc-200/70 rounded-3xl" />
              <div className="col-span-12 md:col-span-6 h-48 bg-zinc-900/60 rounded-3xl" />
            </div>
          </div>
        ) : isError || (!aboutData && !initialData) ? (
          <div className="max-w-4xl mx-auto py-16 px-4">
            <BackendStatusCard
              title="About Studio Unavailable"
              resourceName="studio background & founder profile"
              onRetry={() => loadAbout(true)}
              theme="light"
            />
          </div>
        ) : (
          <AboutSection profile={profile} stats={stats} blocks={blocks} />
        )}
      </MovingTextBg>

      <TechSkillSection />
    </div>
  );
}

