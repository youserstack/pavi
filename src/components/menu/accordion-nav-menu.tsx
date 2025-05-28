import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navItems } from "@/data/items";
import Link from "next/link";

export function AccordionNavMenu() {
  return (
    <Accordion type="single" collapsible className="w-full ">
      {navItems.map((navItem) => (
        <AccordionItem key={navItem.id} value={navItem.id}>
          <AccordionTrigger>{navItem.name}</AccordionTrigger>
          <AccordionContent className="flex flex-col">
            {navItem.children?.map((v1) => (
              <Link
                href={
                  navItem.id === "categories" || navItem.id === "brand"
                    ? `/products?${navItem.id}=${v1.id}`
                    : `/${navItem.id}?type=${v1.id}`
                }
                key={v1.id}
                className="px-2 py-1.5 text-sm font-medium list-none hover:underline"
              >
                {v1.name}
              </Link>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
