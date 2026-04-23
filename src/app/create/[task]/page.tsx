"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ImagePlus, Save, Sparkles, Tag } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth-context";
import { CATEGORY_OPTIONS } from "@/lib/categories";
import { SITE_CONFIG, type TaskKey } from "@/lib/site-config";
import { addLocalPost } from "@/lib/local-posts";
import { classifieds } from "@/lib/classifieds-theme";
import { cn } from "@/lib/utils";

type Field = {
  key: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "url"
    | "number"
    | "tags"
    | "images"
    | "highlights"
    | "category"
    | "file";
  placeholder?: string;
  required?: boolean;
};

const FORM_CONFIG: Record<TaskKey, { title: string; description: string; fields: Field[] }> = {
  listing: {
    title: "Create Business Listing",
    description: "Add a local-only listing with business details.",
    fields: [
      { key: "title", label: "Listing title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Full description", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "logo", label: "Logo URL", type: "url" },
      { key: "images", label: "Gallery images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  classified: {
    title: "Post a classified ad",
    description: "Add photos, a clear price signal, and the right category so local buyers can find you fast. Saved to this browser only until you connect a backend.",
    fields: [
      { key: "title", label: "Ad title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Ad details", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "location", label: "Location", type: "text" },
      { key: "address", label: "Address", type: "text" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "email", label: "Business email", type: "text" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "images", label: "Images", type: "images" },
      { key: "highlights", label: "Highlights", type: "highlights" },
    ],
  },
  article: {
    title: "Create Article",
    description: "Write a local-only article post.",
    fields: [
      { key: "title", label: "Article title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Article content (HTML allowed)", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  image: {
    title: "Create Image Share",
    description: "Share image-only content locally.",
    fields: [
      { key: "title", label: "Image title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Caption", type: "textarea" },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images", required: true },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  profile: {
    title: "Create Profile",
    description: "Create a local-only business profile.",
    fields: [
      { key: "brandName", label: "Brand name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the brand", type: "textarea" },
      { key: "website", label: "Website URL", type: "url", required: true },
      { key: "logo", label: "Logo URL", type: "url", required: true },
    ],
  },
  social: {
    title: "Create Social Post",
    description: "Publish a local-only social update.",
    fields: [
      { key: "title", label: "Post title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Post content", type: "textarea", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "images", label: "Images", type: "images" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  sbm: {
    title: "Create Bookmark",
    description: "Submit a local-only social bookmark.",
    fields: [
      { key: "title", label: "Bookmark title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Why it’s useful", type: "textarea" },
      { key: "website", label: "Target URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
      { key: "tags", label: "Tags", type: "tags" },
    ],
  },
  pdf: {
    title: "Create PDF Entry",
    description: "Add a local-only PDF resource.",
    fields: [
      { key: "title", label: "PDF title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Description", type: "textarea" },
      { key: "fileUrl", label: "PDF file URL", type: "file", required: true },
      { key: "category", label: "Category", type: "category", required: true },
      { key: "images", label: "Cover image", type: "images" },
    ],
  },
  org: {
    title: "Create Organization",
    description: "Create a local-only organization profile.",
    fields: [
      { key: "brandName", label: "Organization name", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "About the organization", type: "textarea" },
      { key: "website", label: "Website URL", type: "url" },
      { key: "logo", label: "Logo URL", type: "url" },
    ],
  },
  comment: {
    title: "Create Blog Comment",
    description: "Store a local-only blog comment entry.",
    fields: [
      { key: "title", label: "Comment title", type: "text", required: true },
      { key: "summary", label: "Short summary", type: "textarea", required: true },
      { key: "description", label: "Comment body", type: "textarea", required: true },
      { key: "website", label: "Target post URL", type: "url", required: true },
      { key: "category", label: "Category", type: "category" },
    ],
  },
};

export default function CreateTaskPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const taskKey = params?.task as TaskKey;

  const taskConfig = useMemo(
    () => SITE_CONFIG.tasks.find((task) => task.key === taskKey && task.enabled),
    [taskKey]
  );
  const formConfig = FORM_CONFIG[taskKey];

  const [values, setValues] = useState<Record<string, string>>({});
  const [uploadingPdf, setUploadingPdf] = useState(false);

  if (!taskConfig || !formConfig) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_100%)] text-slate-950">
        <NavbarShell />
        <main className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-semibold">Task not available</h1>
          <p className="mt-2 text-slate-600">This task is not enabled for the current site.</p>
          <Button className="mt-8 rounded-full bg-[#12B5D4] text-white hover:bg-[#0fa3bf]" asChild>
            <Link href="/">Back home</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const updateValue = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in before creating content.",
      });
      router.push("/login");
      return;
    }

    const missing = formConfig.fields.filter((field) => field.required && !values[field.key]);
    if (missing.length) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields before saving.",
      });
      return;
    }

    const title = values.title || values.brandName || "Untitled";
    const summary = values.summary || "";
    const contentType = taskConfig.contentType || taskKey;

    const content: Record<string, unknown> = {
      type: contentType,
    };

    if (values.category) content.category = values.category;
    if (values.description) content.description = values.description;
    if (values.website) content.website = values.website;
    if (values.email) content.email = values.email;
    if (values.phone) content.phone = values.phone;
    if (values.address) content.address = values.address;
    if (values.location) content.location = values.location;
    if (values.logo) content.logo = values.logo;
    if (values.fileUrl) content.fileUrl = values.fileUrl;
    if (values.brandName) content.brandName = values.brandName;

    const highlights = values.highlights
      ? values.highlights.split(",").map((item) => item.trim()).filter(Boolean)
      : [];
    if (highlights.length) content.highlights = highlights;

    const tags = values.tags
      ? values.tags.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const images = values.images
      ? values.images.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    const post = addLocalPost({
      task: taskKey,
      title,
      summary,
      authorName: user.name,
      tags,
      content,
      media: images.map((url) => ({ url, type: "IMAGE" })),
      publishedAt: new Date().toISOString(),
    });

    toast({
      title: "Saved locally",
      description: "This post is stored only in your browser.",
    });

    router.push(`/local/${taskKey}/${post.slug}`);
  };

  const isClassified = taskKey === "classified";

  const inClass =
    "border border-slate-200/90 bg-white text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.04)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12B5D4]/30 focus-visible:border-[#12B5D4]/40";

  const formFields = (
    <div className="grid gap-6 sm:gap-7">
      {formConfig.fields.map((field) => (
        <div key={field.key} className="grid gap-2">
          <Label className={cn("text-xs font-semibold uppercase tracking-[0.14em]", isClassified ? "text-slate-500" : "text-foreground")}>
            {field.label}
            {field.required ? <span className="ml-1 text-[#12B5D4]">*</span> : null}
          </Label>
          {field.type === "textarea" ? (
            <Textarea
              rows={isClassified && field.key === "summary" ? 3 : 4}
              placeholder={field.placeholder}
              value={values[field.key] || ""}
              onChange={(event) => updateValue(field.key, event.target.value)}
              className={cn(
                inClass,
                isClassified ? "min-h-[100px] rounded-2xl px-4 py-3 resize-y" : "min-h-[100px] rounded-xl px-3 py-2",
              )}
            />
          ) : field.type === "category" ? (
            <div className="relative">
              <select
                value={values[field.key] || ""}
                onChange={(event) => updateValue(field.key, event.target.value)}
                className={cn(
                  inClass,
                  "h-12 w-full appearance-none bg-white pl-4 pr-10 text-sm",
                  isClassified ? "rounded-full" : "rounded-xl",
                )}
              >
                <option value="">Select category</option>
                {CATEGORY_OPTIONS.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          ) : field.type === "file" ? (
            <div className="grid gap-3">
              <div
                className={cn(
                  "relative flex min-h-[88px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-6 text-sm text-slate-600 transition hover:border-[#12B5D4]/50 hover:bg-[#12B5D4]/5",
                )}
              >
                <input
                  type="file"
                  accept="application/pdf"
                  className="absolute inset-0 z-10 cursor-pointer opacity-0"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    if (file.type !== "application/pdf") {
                      toast({
                        title: "Invalid file",
                        description: "Please upload a PDF file.",
                      });
                      return;
                    }
                    const reader = new FileReader();
                    setUploadingPdf(true);
                    reader.onload = () => {
                      const result = typeof reader.result === "string" ? reader.result : "";
                      updateValue(field.key, result);
                      setUploadingPdf(false);
                      toast({
                        title: "PDF uploaded",
                        description: "File is stored locally.",
                      });
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <span className="text-center">Drop a PDF or tap to upload</span>
              </div>
              <Input
                type="text"
                placeholder="Or paste a PDF URL"
                value={values[field.key] || ""}
                onChange={(event) => updateValue(field.key, event.target.value)}
                className={cn(inClass, "h-12 rounded-full pl-4")}
              />
              {uploadingPdf ? <p className="text-xs text-slate-500">Uploading PDF…</p> : null}
            </div>
          ) : (
            <Input
              type={field.type === "number" ? "number" : "text"}
              placeholder={
                field.type === "images" || field.type === "tags" || field.type === "highlights"
                  ? "Separate values with commas"
                  : field.placeholder
              }
              value={values[field.key] || ""}
              onChange={(event) => updateValue(field.key, event.target.value)}
              className={cn(inClass, isClassified ? "h-12 rounded-full pl-4" : "h-11 rounded-xl")}
            />
          )}
        </div>
      ))}
    </div>
  );

  const formActions = (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <button
        type="button"
        onClick={handleSubmit}
        className={cn(
          "inline-flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-full px-8 text-sm font-semibold text-white shadow-sm transition",
          isClassified ? "bg-[#12B5D4] hover:bg-[#0fa3bf]" : "bg-foreground text-background hover:opacity-90",
        )}
      >
        <Save className="h-4 w-4" />
        Save locally
      </button>
      <Button variant="ghost" asChild className="h-12 rounded-full text-[#0a6f82] hover:bg-[#12B5D4]/10">
        <Link href={taskConfig.route} className="inline-flex items-center">
          <Tag className="mr-2 h-4 w-4" />
          View {taskConfig.label}
        </Link>
      </Button>
    </div>
  );

  if (isClassified) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_50%)] text-slate-950">
        <NavbarShell />
        <div className="relative overflow-hidden border-b border-slate-200/60 bg-white/50">
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(18,181,212,0.2),transparent_65%)] blur-2xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.14),transparent_70%)] blur-2xl" />
          <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-0.5 h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm hover:bg-slate-50"
                  asChild
                >
                  <Link href="/classifieds" aria-label="Back to classifieds">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div>
                  <span className={classifieds.badge}>
                    <Sparkles className="h-3.5 w-3.5" />
                    {SITE_CONFIG.name} · {taskConfig.label}
                  </span>
                  <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{formConfig.title}</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{formConfig.description}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#12B5D4] px-4 py-1.5 text-xs font-semibold text-white shadow-sm">Classifieds</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600">Local-only draft</span>
            </div>
          </div>
        </div>

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className={cn(classifieds.panel, "p-6 sm:p-8 lg:p-10")}>
              {formFields}
              {formActions}
            </div>

            <aside className="space-y-5">
              <div className={cn(classifieds.soft, "p-6")}>
                <div className="flex items-center gap-2 text-[#0a6f82]">
                  <ImagePlus className="h-5 w-5" />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.12em]">Photo tips</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Use natural light, show wear honestly, and include a clear shot of any serials or tags buyers care about.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Before you publish</h2>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {['Pick the closest category for search.', 'Add a price or “obo” in the summary if you can.', 'Use chat for coordination—keep phone private until you trust the buyer.'].map((line) => (
                    <li key={line} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#12B5D4]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/help" className="mt-5 inline-flex text-sm font-semibold text-[#0a6f82] hover:underline">
                  Help Center →
                </Link>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4fbfd_0%,#ffffff_100%)] text-slate-950">
      <NavbarShell />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-8 flex items-start gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full border border-slate-200 bg-white shadow-sm"
            asChild
          >
            <Link href="/" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.02em] text-slate-950 sm:text-3xl">{formConfig.title}</h1>
            <p className="mt-2 text-sm text-slate-600">{formConfig.description}</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{taskConfig.label}</span>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">Local-only</span>
          </div>

          {formFields}
          {formActions}
        </div>
      </main>
      <Footer />
    </div>
  );
}
