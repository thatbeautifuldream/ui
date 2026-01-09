"use client";

import { motion, AnimatePresence } from "motion/react";
import * as React from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const ANIMATION_DURATION = 0.4;
const EASING = [0.32, 0.72, 0, 1] as const;

export type MenuItem = {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  children?: MenuItem[];
  href?: string;
};

type NestedDrawerContext = {
  menuStack: MenuItem[][];
  currentMenu: MenuItem[];
  direction: "forward" | "backward";
  navigateToMenu: (items: MenuItem[]) => void;
  navigateBack: () => void;
  canGoBack: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const NestedDrawerContext = React.createContext<
  NestedDrawerContext | undefined
>(undefined);

const useNestedDrawer = () => {
  const context = React.useContext(NestedDrawerContext);
  if (!context) {
    throw new Error(
      "NestedDrawer compound components must be used within NestedDrawer"
    );
  }
  return context;
};

type TNestedDrawerProps = {
  children: React.ReactNode;
  initialMenu: MenuItem[];
};

export function NestedDrawer({ children, initialMenu }: TNestedDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const [menuStack, setMenuStack] = React.useState<MenuItem[][]>([initialMenu]);
  const [direction, setDirection] = React.useState<"forward" | "backward">(
    "forward"
  );

  const currentMenu = menuStack[menuStack.length - 1];
  const canGoBack = menuStack.length > 1;

  const navigateToMenu = React.useCallback((items: MenuItem[]) => {
    setDirection("forward");
    setMenuStack((prev) => [...prev, items]);
  }, []);

  const navigateBack = React.useCallback(() => {
    if (menuStack.length > 1) {
      setDirection("backward");
      setMenuStack((prev) => prev.slice(0, -1));
    }
  }, [menuStack.length]);

  React.useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setMenuStack([initialMenu]);
        setDirection("forward");
      }, ANIMATION_DURATION * 1000);
      return () => clearTimeout(timeout);
    }
  }, [open, initialMenu]);

  return (
    <NestedDrawerContext.Provider
      value={{
        menuStack,
        currentMenu,
        direction,
        navigateToMenu,
        navigateBack,
        canGoBack,
        open,
        setOpen,
      }}
    >
      {children}
    </NestedDrawerContext.Provider>
  );
}

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function Trigger({ children, className, ...props }: TriggerProps) {
  const { setOpen } = useNestedDrawer();

  return (
    <button
      type="button"
      className={cn(
        "relative flex h-10 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-card px-4 text-sm font-medium shadow-sm transition-all hover:bg-accent border cursor-pointer",
        className
      )}
      onClick={() => setOpen(true)}
      aria-label="Open menu drawer"
      {...props}
    >
      {children}
    </button>
  );
}

type ContentProps = {
  title?: string;
  children?: React.ReactNode;
};

function Content({ title, children }: ContentProps) {
  const { open, setOpen, canGoBack, navigateBack, currentMenu } =
    useNestedDrawer();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | "auto">("auto");

  React.useEffect(() => {
    if (open && contentRef.current) {
      const firstFocusable = contentRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [open]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, setOpen]);

  React.useEffect(() => {
    if (!innerRef.current || !open) {
      setHeight("auto");
      return;
    }

    const measureHeight = () => {
      if (innerRef.current) {
        const newHeight = innerRef.current.offsetHeight;
        setHeight(newHeight);
      }
    };

    measureHeight();

    const resizeObserver = new ResizeObserver(measureHeight);
    resizeObserver.observe(innerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [currentMenu, canGoBack, open]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: EASING }}
            className="fixed -inset-8 bg-black/40 z-50 backdrop-blur-sm cursor-pointer"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ y: "calc(100% + 1rem)" }}
            animate={{ y: 0 }}
            exit={{ y: "calc(100% + 1rem)" }}
            transition={{ duration: ANIMATION_DURATION, ease: EASING }}
            className="fixed inset-x-0 bottom-4 z-50 mx-auto max-w-lg px-4"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Menu drawer"}
          >
            <motion.div
              animate={{ height }}
              transition={{
                duration: ANIMATION_DURATION,
                ease: EASING,
              }}
              className="bg-card border rounded-2xl shadow-xl max-h-[85vh] overflow-hidden"
            >
              <div ref={innerRef}>
                {canGoBack && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: {
                        duration: ANIMATION_DURATION * 0.6,
                        ease: EASING,
                      },
                    }}
                    className="px-4 pt-4 pb-2 shrink-0"
                  >
                    <button
                      type="button"
                      onClick={navigateBack}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      aria-label="Navigate back"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  </motion.div>
                )}

                <div className="px-1 py-4 max-h-[calc(85vh-4rem)] overflow-y-auto overflow-x-hidden">
                  <div className="px-3">{children || <Menu />}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Menu() {
  const { currentMenu, direction } = useNestedDrawer();

  const variants = {
    enter: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: "forward" | "backward") => ({
      x: dir === "forward" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={currentMenu[0]?.id || "root"}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: ANIMATION_DURATION * 0.5,
            ease: EASING,
          }}
          // style={{ position: "relative" }}
          className="space-y-1 relative"
          role="menu"
          aria-orientation="vertical"
        >
          {currentMenu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type MenuItemProps = {
  item: MenuItem;
};

function MenuItem({ item }: MenuItemProps) {
  const { navigateToMenu, setOpen } = useNestedDrawer();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      navigateToMenu(item.children!);
    } else if (item.href) {
      // Close drawer when navigating to a link
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const Icon = item.icon;

  const content = (
    <>
      {Icon && (
        <div className="shrink-0 mt-1 text-muted-foreground">
          <Icon className="size-5" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground">{item.title}</div>
        {item.description && (
          <div className="text-sm text-muted-foreground mt-0.5">
            {item.description}
          </div>
        )}
      </div>

      {hasChildren && (
        <div className="shrink-0 text-muted-foreground">
          <ChevronRight className="w-5 h-5" />
        </div>
      )}
    </>
  );

  const className = cn(
    "w-full flex items-start gap-3 px-4 py-3 rounded-lg text-left transition-colors cursor-pointer",
    "hover:bg-accent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
    "active:bg-accent/80"
  );

  // Render as Link if href is provided and no children
  if (item.href && !hasChildren) {
    return (
      <motion.div whileTap={{ scale: 0.98 }} transition={{ duration: 0.1 }}>
        <Link
          href={item.href}
          onClick={handleClick}
          className={className}
          role="menuitem"
          tabIndex={0}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  // Render as button for items with children
  return (
    <motion.button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      role="menuitem"
      aria-haspopup={hasChildren}
      tabIndex={0}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {content}
    </motion.button>
  );
}

NestedDrawer.Trigger = Trigger;
NestedDrawer.Content = Content;
NestedDrawer.Menu = Menu;
NestedDrawer.MenuItem = MenuItem;
