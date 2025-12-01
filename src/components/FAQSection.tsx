import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  const faqs = [
    {
      question: "What is Odo Bhraman?",
      answer: "Odo Bhraman is your comprehensive guide to exploring Odisha. We provide curated information about places, festivals, food, culture, and a unique homestay network connecting travelers with local hosts across the state."
    },
    {
      question: "How can I plan my trip to Odisha?",
      answer: "Browse through our sections on Places, Districts, Festivals, and Food to discover what interests you. Create an account to save your favorite destinations, and use our Stays feature to connect with local hosts for authentic experiences."
    },
    {
      question: "Is this service available across all districts?",
      answer: "Yes! Odo Bhraman covers all 30 districts of Odisha. Each district page provides detailed information about attractions, festivals, local foods, and travel tips to help you explore comprehensively."
    },
    {
      question: "How do I save places or foods?",
      answer: "Simply create a free account and log in. You'll see a heart icon on places, foods, and festivals pages. Click it to save items to your personal collection, which you can access anytime from your profile."
    },
    {
      question: "How do Stays (Host/Surfer) work?",
      answer: "Our Stays feature is like couchsurfing for Odisha. Hosts can create profiles offering accommodation, while surfers (travelers) can browse hosts and send stay requests. It's a great way to experience local hospitality and make authentic connections."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us through the Contact page, email us at odobhraman@gmail.com, or call us at +91 9692207500 / +91 9090809265. We're always happy to help with your queries!"
    }
  ];

  return (
    <section ref={sectionRef} className="container mx-auto px-4 sm:px-6 py-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Frequently Asked Questions
          </h2>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Everything you need to know about exploring Odisha with Odo Bhraman
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-2xl px-6 bg-card shadow-sm hover:shadow-md transition-smooth"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="lg:col-span-1">
          <Card className="border-2 border-primary/20 rounded-2xl shadow-lg sticky top-24 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                Still need help?
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our team is always ready to assist you with any questions about your Odisha journey.
              </p>
              
              <Button 
                asChild 
                className="w-full rounded-xl h-12 bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-smooth"
              >
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Quick Contact</p>
                <p className="font-semibold text-foreground">+91 9692207500</p>
                <p className="text-sm text-primary">odobhraman@gmail.com</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
