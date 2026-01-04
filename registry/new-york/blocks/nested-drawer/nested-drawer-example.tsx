"use client";

import {
  BookOpen,
  Briefcase,
  Building2,
  HelpCircle,
  Home as HomeIcon,
  Mail,
  Package,
  Server,
  Shield,
  Users,
} from "lucide-react";

import type { TMenuItem } from "@/registry/new-york/blocks/nested-drawer/components/nested-drawer";
import { NestedDrawer } from "@/registry/new-york/blocks/nested-drawer/components/nested-drawer";

const MENU_DATA: TMenuItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to our platform",
    icon: HomeIcon,
    href: "#",
  },
  {
    id: "products",
    title: "Products & Services",
    description: "Explore our offerings",
    icon: Package,
    children: [
      {
        id: "products-software",
        title: "Software Solutions",
        description: "Enterprise and custom software",
        icon: Server,
        href: "#",
      },
      {
        id: "products-cloud",
        title: "Cloud Services",
        description: "Scalable cloud infrastructure",
        icon: Shield,
        href: "#",
      },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Learn about our organization",
    icon: Users,
    children: [
      {
        id: "company-about",
        title: "About Us",
        description: "Our story and mission",
        icon: Building2,
        href: "#",
      },
      {
        id: "company-careers",
        title: "Careers",
        description: "Join our team",
        icon: Briefcase,
        href: "#",
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    description: "Knowledge base and materials",
    icon: BookOpen,
    href: "#",
  },
  {
    id: "support",
    title: "Support",
    description: "Get help when you need it",
    icon: HelpCircle,
    href: "#",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
    icon: Mail,
    href: "#",
  },
];

export function NestedDrawerExample() {
  return (
    <NestedDrawer initialMenu={MENU_DATA}>
      <NestedDrawer.Trigger>
        <span>Open Menu</span>
      </NestedDrawer.Trigger>
      <NestedDrawer.Content title="Main Menu">
        <NestedDrawer.Menu />
      </NestedDrawer.Content>
    </NestedDrawer>
  );
}
