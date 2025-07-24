"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";

import {
  Settings,
  User,
  FolderOpen,
  Award,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Profile",
      url: "/",
      icon: User,
    },

    {
      title: "Projects",
      url: "/AdminProjects",
      icon: FolderOpen,
    },
    {
      title: "Skills",
      url: "/AdminSkills",
      icon: Settings,
    },
    {
      title: "Certifications",
      url: "/AdminCertifications",
      icon: Award,
    },
    {
      title: "About",
      url: "/AdminAbout",
      icon: FileText,
    },
    {
      title: "Contact",
      url: "/AdminContact",
      icon: Mail,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
