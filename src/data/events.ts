export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  image?: string;
  type: "upcoming" | "promotion" | "announcement";
  featured?: boolean;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Sunday Jazz Brunch",
    description:
      "Unwind this Sunday with live jazz performances alongside our signature brunch menu. Enjoy bottomless mimosas and specially curated breakfast dishes in an atmosphere of pure elegance.",
    date: "Every Sunday",
    time: "11:00 AM – 3:00 PM",
    image:
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2070",
    type: "upcoming",
    featured: true,
  },
  {
    id: 2,
    title: "Wine & Dine Wednesday",
    description:
      "Experience our curated wine pairing evening. Enjoy a three-course dinner expertly paired with premium wines from our cellar. Perfect for date nights and intimate gatherings.",
    date: "Every Wednesday",
    time: "6:00 PM – 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070",
    type: "upcoming",
    featured: true,
  },
  {
    id: 3,
    title: "New Year's Eve Gala",
    description:
      "Ring in the new year with an unforgettable celebration. A five-course dinner, premium open bar, live band, and a spectacular champagne toast at midnight. Black tie optional.",
    date: "December 31, 2026",
    time: "7:00 PM – 2:00 AM",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070",
    type: "upcoming",
    featured: true,
  },
  {
    id: 4,
    title: "Summer Cocktail Festival",
    description:
      "Celebrate the season with our mixologists' latest creations. Sample exclusive summer cocktails, enjoy light bites, and soak in the vibrant atmosphere of our lounge.",
    date: "August 15–17, 2026",
    time: "4:00 PM – 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=2069",
    type: "upcoming",
  },
  {
    id: 5,
    title: "Happy Hour Special",
    description:
      "Join us Monday through Friday for our legendary happy hour. Enjoy 25% off selected cocktails, wines by the glass, and appetizers. The perfect after-work unwind.",
    date: "Monday – Friday",
    time: "4:00 PM – 7:00 PM",
    type: "promotion",
    featured: true,
  },
  {
    id: 6,
    title: "Ladies' Night",
    description:
      "Every Thursday is Ladies' Night at Casper & Gambini's. Enjoy complimentary welcome cocktails and exclusive discounts on selected drinks and desserts.",
    date: "Every Thursday",
    time: "6:00 PM – 11:00 PM",
    type: "promotion",
  },
  {
    id: 7,
    title: "New Brunch Menu Launch",
    description:
      "We're excited to announce our expanded brunch menu! New additions include exotic smoothie bowls, avocado toast variations, and our signature bottomless brunch experience.",
    date: "Now Available",
    time: "10:00 AM – 3:00 PM",
    type: "announcement",
  },
  {
    id: 8,
    title: "Live Band Fridays",
    description:
      "Experience the best of Lagos live music every Friday night. From Afrobeat to jazz, our rotating lineup of talented musicians sets the perfect tone for your weekend.",
    date: "Every Friday",
    time: "8:00 PM – 12:00 AM",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=2070",
    type: "upcoming",
    featured: true,
  },
];

export const eventTypes = [
  { value: "all" as const, label: "All Events" },
  { value: "upcoming" as const, label: "Upcoming" },
  { value: "promotion" as const, label: "Promotions" },
  { value: "announcement" as const, label: "Announcements" },
];
