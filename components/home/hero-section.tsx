"use client";

import { HeroSection as HeroSectionComponent } from "@/components/hero-section";
import { Icons } from "@/components/ui/icons";
import { BookOpen } from "lucide-react";

function HeroSection() {
  return (
    <HeroSectionComponent
      badge={{
        text: "New: Write blogs with Markdown + AI",
        action: {
          text: "Learn more",
          href: "/features",
        },
      }}
      title="Write. Share. Grow with DevSpace."
      description="DevSpace is the developer-first blogging platform where you can write technical articles, share knowledge, and grow your presence in the dev community."
      actions={[
        {
          text: "✍️ Start Writing",
          href: "/write",
          variant: "default",
        },
        {
          text: " Explore Blogs",
          href: "/articles/create",
          variant: "default",
          icon: <BookOpen className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "/logo.png", // Place inside /public/images/
        dark: "/logi.png",   // Place inside /public/images/
        alt: "DevSpace blog dashboard preview",
      }}
    />
  );
}

export default HeroSection;
