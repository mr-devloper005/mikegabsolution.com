"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Inbox, Sparkles } from "lucide-react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory, CATEGORY_OPTIONS } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { classifieds } from "@/lib/classifieds-theme";
import { cn } from "@/lib/utils";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);
  const isClassified = task === "classified";

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  const categoryLabel = useMemo(() => {
    const raw = category ? normalizeCategory(category) : "all";
    if (raw === "all") return "All categories";
    return CATEGORY_OPTIONS.find((c) => c.slug === raw)?.name || raw;
  }, [category]);

  const emptyClassified = (
    <div
      className={cn(
        classifieds.panel,
        "flex flex-col items-center justify-center gap-4 px-6 py-16 text-center sm:py-20",
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#12B5D4]/12 text-[#0a6f82]">
        <Inbox className="h-7 w-7" />
      </div>
      <div className="max-w-md">
        <p className="text-lg font-semibold text-slate-900">No listings in this view yet</p>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Try another category, check back soon, or be the first to post in{" "}
          {categoryLabel === "All categories" ? "this feed" : `“${categoryLabel}”`}.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/classifieds" className={cn(classifieds.pill, "inline-flex items-center text-sm")}>
          View all categories
        </Link>
        <Link
          href="/create/classified"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:border-[#12B5D4]/40"
        >
          Post an ad
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );

  const defaultEmpty = (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
      No posts yet for this section.
    </div>
  );

  if (!merged.length) {
    if (isClassified) {
      return (
        <section className="space-y-6" aria-labelledby="browse-listings">
          <header className="flex flex-col gap-3 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="browse-listings" className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Browse listings
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Filter: <span className="font-semibold text-[#0a6f82]">{categoryLabel}</span>
              </p>
            </div>
            <span className={cn(classifieds.badge, "w-fit")}>
              <Sparkles className="h-3.5 w-3.5" />
              0 results
            </span>
          </header>
          {emptyClassified}
        </section>
      );
    }
    return defaultEmpty;
  }

  const grid = (
    <div
      className={cn(
        "grid gap-6",
        isClassified ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );

  if (isClassified) {
    return (
      <section className="space-y-6" id="listings" aria-labelledby="browse-listings">
        <header className="flex flex-col gap-3 border-b border-slate-200/80 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="browse-listings" className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Browse listings
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Showing: <span className="font-semibold text-[#0a6f82]">{categoryLabel}</span>
              <span className="text-slate-400"> · </span>
              <span className="text-slate-600">
                {merged.length} {merged.length === 1 ? "ad" : "ads"}
              </span>
            </p>
          </div>
          <Link
            href="/create/classified"
            className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-[#12B5D4]/40 sm:w-auto"
          >
            List your item
          </Link>
        </header>
        {grid}
      </section>
    );
  }

  return grid;
}
