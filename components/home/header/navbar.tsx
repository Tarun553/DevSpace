"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import  ModeToggle  from "@/components/ui/toggle";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import SearchInput from "./search-input";

const navLinks = [
  { name: "Articles", href: "/articles" },
  { name: "Tutorial", href: "/tutorial" },
  { name: "About", href: "/about" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  return (
    <header className="w-full border-b shadow-sm bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          DevSpace
        </Link>

        {/* Center: Nav Links (Desktop) */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Search + Toggle + User */}
        <div className="hidden md:flex items-center gap-4">
          <SearchInput />
          <ModeToggle />
          <SignedIn>
          <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm">Sign up</Button>
          </SignUpButton>
          </SignedOut>
          
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col gap-4 mt-6 ml-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Only Search + Toggle + User */}
              
                <ModeToggle />
                <SignedIn>
                  <SearchInput />
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full justify-start">Sign up</Button>
                  </SignUpButton>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
