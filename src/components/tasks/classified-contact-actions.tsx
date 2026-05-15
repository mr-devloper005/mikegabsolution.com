"use client";

import * as React from "react";
import { Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function maskPhone(phone: string) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  if (digits.length <= 4) return "••••";
  const tail = digits.slice(-4);
  return `•••• •••• ${tail}`;
}

export function ClassifiedContactActions({
  phone,
  website,
  className,
}: {
  phone?: string | null;
  website?: string | null;
  className?: string;
}) {
  const [showPhone, setShowPhone] = React.useState(false);
  const normalizedPhone = typeof phone === "string" ? phone.trim() : "";
  const normalizedWebsite = typeof website === "string" ? website.trim() : "";

  return (
    <div className={cn("space-y-4", className)}>
      {normalizedPhone ? (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
          <div className="flex min-w-0 items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="truncate text-sm font-medium text-foreground">
              {showPhone ? normalizedPhone : maskPhone(normalizedPhone)}
            </span>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="h-9 rounded-full px-4"
            onClick={() => setShowPhone((prev) => !prev)}
          >
            {showPhone ? "Hide" : "Show"}
          </Button>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {normalizedPhone ? (
          <Button asChild variant="outline" className="h-11 rounded-full border-border bg-background">
            <a href={`tel:${normalizedPhone}`} className="inline-flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>
        ) : null}
      </div>

      {normalizedWebsite ? (
        <Button asChild variant="secondary" className="h-11 w-full rounded-full">
          <a
            href={normalizedWebsite}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2"
          >
            <Globe className="h-4 w-4" />
            Visit Website
          </a>
        </Button>
      ) : null}
    </div>
  );
}

