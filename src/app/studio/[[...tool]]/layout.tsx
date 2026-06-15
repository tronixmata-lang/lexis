export const metadata = {
  title: "Lexis CMS Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-screen min-h-screen">{children}</div>;
}
