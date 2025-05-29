import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { navItems } from "@/data/items";

export default function CategoryFilter() {
  return (
    <Accordion type="single" collapsible className="w-full ">
      {navItems.map((navItem) => (
        <AccordionItem key={navItem.id} value={navItem.id}>
          <AccordionTrigger>{navItem.name}</AccordionTrigger>
          <AccordionContent className="flex flex-col">
            {navItem.children?.map((v1) => (
              <div key={v1.id}>{v1.name}</div>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
