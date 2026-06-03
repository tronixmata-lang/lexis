import Link from "next/link";
import { BRAND, CONTACT } from "@/lib/constants";

export default function ContactInfoPanel() {
  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Offices</p>
        <p className="mt-2 font-medium text-white">{CONTACT.address}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Contact Info</p>
        <div className="mt-2 space-y-1">
          {CONTACT.phones.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`} className="block font-medium text-white hover:text-gold">
              {p.display}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Opening Hours</p>
        <p className="mt-2 font-medium text-white">{CONTACT.hours}</p>
        <p className="text-sm text-gray-400">{CONTACT.days}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold">Our Email</p>
        <a href={`mailto:${CONTACT.email}`} className="mt-2 block font-medium text-white hover:text-gold">
          {CONTACT.email}
        </a>
      </div>

      <div className="flex flex-wrap gap-3 pt-1">
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
