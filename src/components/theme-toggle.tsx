"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OPTIONS = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change colour theme">
          {/*
            The server cannot know the visitor's scheme, so the icon is chosen by
            CSS rather than by state: both are rendered and the class on <html>
            hides one. That keeps the server and client markup identical and
            avoids a flash on hydration.
          */}
          <SunIcon className="dark:hidden" aria-hidden="true" />
          <MoonIcon className="hidden dark:block" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      {/* The menu mounts on open, which is always after hydration, so reading
          the stored theme here cannot cause a mismatch. */}
      <DropdownMenuContent align="end">
        {OPTIONS.map(({ value, label, Icon }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={theme === value}
            onCheckedChange={() => setTheme(value)}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
