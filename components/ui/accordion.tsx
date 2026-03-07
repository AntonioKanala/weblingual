"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

export interface AccordionItemProps {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemProps[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion = ({
  items,
  allowMultiple = false,
  className,
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openItems.includes(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};

interface AccordionItemComponentProps {
  item: AccordionItemProps;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: AccordionItemComponentProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-text-light/10 bg-background-light shadow-sm transition-shadow hover:shadow-md">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-text-light/5"
        aria-expanded={isOpen}
      >
        <span className="font-body text-lg font-semibold text-text-light">
          {item.title}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-accent-gold transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.25, 0.1, 0, 1] },
              opacity: { duration: 0.2, ease: [0.25, 0.1, 0, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-text-light/10 p-6 pt-4">
              <div className="prose prose-sm max-w-none text-text-muted">
                {item.content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
