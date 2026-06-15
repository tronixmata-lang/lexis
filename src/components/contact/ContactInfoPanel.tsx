import Link from "next/link";
import { BRAND, CONTACT } from "@/lib/constants";
import type { ContactPageContent } from "@/sanity/lib/fetch";

type ContactInfoPanelProps = {
  content?: ContactPageContent;
};

export default function ContactInfoPanel({ content }: ContactInfoPanelProps) {
  const address = content?.address ?? CONTACT.address;
  const email = content?.email ?? CONTACT.email;
  const hours = content?.hours ?? CONTACT.hours;
  const days = content?.days ?? CONTACT.days;
  const phones = content?.phones ?? CONTACT.phones;

  return (
    <div className="space-y-5 text-center">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Offices</p>
        <p className="mt-2 font-medium text-white">{address}</p>
        <a
          href={CONTACT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-gold hover:underline"
        >
          Get Directions
        </a>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Contact Info</p>
        <div className="mt-2 space-y-1">
          {phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="block font-medium text-white hover:text-gold">
              {p.display}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Opening Hours</p>
        <p className="mt-2 font-medium text-white">{hours}</p>
        <p className="text-sm text-gray-400">{days}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Email</p>
        <a href={`mailto:${email}`} className="mt-2 block font-medium text-white hover:text-gold">
          {email}
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
        <a
          href={BRAND.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          WhatsApp Chat
        </a>
        <Link href="/consultation" className="btn-gold text-sm">
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
