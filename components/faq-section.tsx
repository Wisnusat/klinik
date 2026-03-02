'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function FaqSection() {
  const faqs = [
    {
      id: 'item-1',
      q: 'Do you accept BPJS?',
      a: 'Yes. We accept BPJS for eligible services. Requirements and coverage may vary depending on your case and referral status (dummy content—replace with your clinic policy).'
    },
    {
      id: 'item-2',
      q: 'Is the Emergency Unit (IGD) open 24 hours?',
      a: 'Yes. Our IGD operates 24/7 for urgent and emergency cases. For life-threatening emergencies, please contact the emergency hotline immediately.'
    },
    {
      id: 'item-3',
      q: 'How do I register for the online queue?',
      a: 'You can register from the “Register for Online Queue” section. Choose a service, fill in your details, and you’ll receive a queue number (dummy flow).'
    },
    {
      id: 'item-4',
      q: 'Do you have an operating room (OR)?',
      a: 'Yes. Our operating room supports urgent and scheduled procedures based on doctor assessment and availability (dummy content).'
    },
    {
      id: 'item-5',
      q: 'What documents should I bring?',
      a: 'Bring a valid ID, your BPJS card (if applicable), referral documents (if required), and any prior medical records or lab results.'
    }
  ]

  return (
    <section id="faq" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/60 text-balance">
            Quick answers about BPJS, emergency services, operating room availability, and registration.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent className="text-foreground/70">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
