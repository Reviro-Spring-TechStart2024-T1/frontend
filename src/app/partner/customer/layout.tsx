export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="pb-14 pt-6">
      <div className="container">
        <div className="flex flex-col gap-6 rounded-md bg-theme-white p-6">
          {children}
        </div>
      </div>
    </section>
  );
}
