import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Casper & Gambini's Ikeja | Luxury Restaurant & Bar",
    template: "%s | Casper & Gambini's Ikeja",
  },
  description:
    "Experience world-class dining at Casper & Gambini's Ikeja. Premium international cuisine, artisanal coffee, craft cocktails, and an extensive wine selection at Ikeja City Mall, Lagos.",
  keywords: [
    "Casper and Gambini's",
    "Ikeja restaurant",
    "Lagos fine dining",
    "Ikeja City Mall restaurant",
    "Nigerian restaurant",
    "international cuisine Lagos",
    "best restaurant Ikeja",
    "Casper & Gambini's Ikeja menu",
    "Lagos brunch",
    "restaurant in Ikeja",
  ],
  authors: [{ name: "Casper & Gambini's Ikeja" }],
  creator: "Casper & Gambini's Ikeja",
  publisher: "Casper & Gambini's Ikeja",
  metadataBase: new URL("https://casperandgambinis.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Casper & Gambini's Ikeja",
    title: "Casper & Gambini's Ikeja | Luxury Restaurant & Bar",
    description:
      "Where great food meets great moments. Experience premium international cuisine at Ikeja City Mall, Lagos.",
    url: "https://casperandgambinis.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Casper & Gambini's Ikeja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casper & Gambini's Ikeja",
    description:
      "Where great food meets great moments. Experience premium dining at Ikeja City Mall.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Restaurant Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Casper & Gambini's Ikeja",
              description:
                "Upscale restaurant offering international cuisine, breakfast, lunch, dinner, coffee, cocktails, and wines at Ikeja City Mall.",
              url: "https://casperandgambinis.com",
              telephone: "+2349038900015",
              email: "info@casperandgambinis.com",
              servesCuisine: [
                "International",
                "Nigerian",
                "Italian",
                "Continental",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Ikeja City Mall, Obafemi Awolowo Way, Oregun",
                addressLocality: "Ikeja",
                addressRegion: "Lagos",
                postalCode: "101233",
                addressCountry: "NG",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 6.601777,
                longitude: 3.354708,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "10:00",
                  closes: "02:00",
                },
              ],
              priceRange: "₦₦₦",
              image:
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.4",
                reviewCount: "1247",
                bestRating: "5",
              },
            }),
          }}
        />
      </head>
      <body className="bg-[var(--warm-black)] text-[var(--cream)] antialiased dark">
        {children}
      </body>
    </html>
  );
}
