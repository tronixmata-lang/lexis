import type { ServicePage } from "./services";
import type { FaqItem } from "./schema";

export function getServiceFaqs(page: ServicePage): FaqItem[] {
  const area = page.navLabel ?? page.title;
  const servicesList = page.services.slice(0, 5).join(", ");

  return [
    {
      question: `What ${area.toLowerCase()} services does Lexis and Legis provide in Nepal?`,
      answer: `${page.subtitle}. We offer ${servicesList}, and related advisory support. ${page.description}`,
    },
    {
      question: `How can I consult a lawyer for ${area.toLowerCase()} in Kathmandu?`,
      answer:
        "Book a consultation through our website, call our Anamnagar office, or submit the contact form on this page. We offer in-person meetings and online consultations for clients in Nepal and abroad.",
    },
    {
      question: `Why choose Lexis and Legis for ${area.toLowerCase()} matters in Nepal?`,
      answer:
        "Lexis and Legis is a leading law firm in Kathmandu with experienced attorneys in commercial and civil law. We provide strategic planning, document drafting, regulatory compliance, and court representation tailored to each matter.",
    },
  ];
}
