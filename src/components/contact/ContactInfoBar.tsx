import { CONTACT } from "@/lib/constants";

function IconPin() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

const COLUMNS = [
  {
    title: "Our Offices",
    icon: IconPin,
    content: () => <p className="mt-2 text-sm leading-relaxed text-white/95">{CONTACT.address}</p>,
  },
  {
    title: "Contact Info",
    icon: IconPhone,
    content: () => (
      <div className="mt-2 space-y-1">
        {CONTACT.phones.map((p) => (
          <a
            key={p.tel}
            href={`tel:${p.tel}`}
            className="block text-sm text-white/95 transition-colors hover:text-gold"
          >
            {p.display}
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Opening Hours",
    icon: IconCalendar,
    content: () => (
      <div className="mt-2 text-sm text-white/95">
        <p>{CONTACT.hours}</p>
        <p className="mt-1">{CONTACT.days}</p>
      </div>
    ),
  },
  {
    title: "Our Email",
    icon: IconMail,
    content: () => (
      <a
        href={`mailto:${CONTACT.email}`}
        className="mt-2 block text-sm text-white/95 transition-colors hover:text-gold"
      >
        {CONTACT.email}
      </a>
    ),
  },
] as const;

export default function ContactInfoBar() {
  return (
    <section className="bg-gradient-to-r from-primary via-[#0d4390] to-navy py-10 text-white">
      <div className="container-narrow px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map(({ title, icon: Icon, content: Content }) => (
            <div key={title} className="flex gap-4">
              <div className="shrink-0 text-white/90">
                <Icon />
              </div>
              <div>
                <h3 className="font-semibold tracking-wide">{title}</h3>
                <Content />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
