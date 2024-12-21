import type { Metadata } from 'next';
import { Poppins, Damion } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const damion = Damion({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-damion',
});

export const metadata: Metadata = {
  title: 'Brilliant Dine',
  description:
    "At Brilliant Dine, we serve a delightful fusion of flavors,crafted with the finest ingredients to make every mealunforgettable. Whether you're craving classic comfort food or bold, innovative dishes, our menu has something to satisfy every palate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
      <Script src="/assets/translation.js" strategy="beforeInteractive" />
      <Script
        src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
        strategy="afterInteractive"
      />
      <body className={`${poppins.className} ${damion.variable}`}>
        <div id="google_translate_element"></div>
        {children}
      </body>
    </html>
  );
}
