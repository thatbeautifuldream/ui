import {
  NestedDrawer,
  TMenuItem,
} from "@/registry/new-york/blocks/nested-drawer/components/nested-drawer";
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

const MENU_DATA: TMenuItem[] = [
  {
    id: "home",
    title: "Home",
    description: "Welcome to our platform",
    icon: <HomeIcon className="size-5" />,
    onClick: () => console.log("Home clicked"),
  },
  {
    id: "products",
    title: "Products & Services",
    description: "Explore our offerings",
    icon: <Package className="size-5" />,
    children: [
      {
        id: "products-software",
        title: "Software Solutions",
        description: "Enterprise and custom software",
        icon: <Server className="size-5" />,
        onClick: () => console.log("Software clicked"),
      },
      {
        id: "products-cloud",
        title: "Cloud Services",
        description: "Scalable cloud infrastructure",
        icon: <Shield className="size-5" />,
        onClick: () => console.log("Cloud clicked"),
      },
    ],
  },
  {
    id: "company",
    title: "Company",
    description: "Learn about our organization",
    icon: <Users className="size-5" />,
    children: [
      {
        id: "company-about",
        title: "About Us",
        description: "Our story and mission",
        icon: <Building2 className="size-5" />,
        onClick: () => console.log("About Us clicked"),
      },
      {
        id: "company-careers",
        title: "Careers",
        description: "Join our team",
        icon: <Briefcase className="size-5" />,
        onClick: () => console.log("Careers clicked"),
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    description: "Knowledge base and materials",
    icon: <BookOpen className="size-5" />,
    onClick: () => console.log("Resources clicked"),
  },
  {
    id: "support",
    title: "Support",
    description: "Get help when you need it",
    icon: <HelpCircle className="size-5" />,
    onClick: () => console.log("Support clicked"),
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with our team",
    icon: <Mail className="size-5" />,
    onClick: () => console.log("Contact clicked"),
  },
];

export default function NestedDrawerExample() {
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
