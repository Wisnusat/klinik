'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { DEFAULT_FAQ, type FaqContent, type FaqItem } from '@/lib/cms'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface FaqSectionProps {
  faq?: any
}

export default function FaqSection({ faq }: FaqSectionProps) {
  const f: FaqContent = {
    ...DEFAULT_FAQ,
    ...faq,
    items: faq?.items ?? DEFAULT_FAQ.items,
  }

  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {f.title}
          </h2>
          <p className="text-lg text-foreground/60 text-balance">
            {f.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {f.items.map((item: FaqItem, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
