import { Typography } from '@/shared/ui';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <section className="flex flex-col gap-8 pb-14 pt-6">
        <Typography variant="h2" weight="bold">
          Customer Data
        </Typography>

        <div className="rounded-md bg-theme-white p-6">{children}</div>
      </section>
    </div>
  );
}
