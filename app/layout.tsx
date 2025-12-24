import './globals.css';
export const metadata = { title: 'FalconX - Safety Alerts' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
