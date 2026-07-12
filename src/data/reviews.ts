export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Chioma E.",
    rating: 5,
    text: "Absolutely stunning ambiance! The breakfast menu is incredible — the English Breakfast is a must-try. The staff were so welcoming and attentive.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Tunde A.",
    rating: 4,
    text: "Great place for dates. The atmosphere is romantic and elegant. Their pasta selection is wonderful, especially the Chicken Alfredo.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Amara O.",
    rating: 5,
    text: "Best brunch spot in Ikeja! The Gambini's Omelette is perfectly made every time. Their coffee game is also top-notch.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Femi D.",
    rating: 4,
    text: "Excellent customer service and beautiful interior design. The desserts are heavenly — don't leave without trying the Chocolate Fondant.",
    date: "1 month ago",
  },
  {
    id: 5,
    name: "Yetunde K.",
    rating: 5,
    text: "I hosted my birthday dinner here and it was perfect. The staff went above and beyond. Great cocktails and even better food!",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Chidi N.",
    rating: 4,
    text: "The ambience is unmatched in Lagos. Whether you're coming for the suya mixed grill or just drinks at the bar, you'll have a fantastic time.",
    date: "3 weeks ago",
  },
  {
    id: 7,
    name: "Ngozi M.",
    rating: 5,
    text: "Love the family-friendly vibe. My kids adore the Mickey & Minnie Pizza and I can enjoy a glass of wine knowing they're well taken care of.",
    date: "1 month ago",
  },
  {
    id: 8,
    name: "Segun P.",
    rating: 4,
    text: "Perfect spot for after-work drinks. The Gold Rush cocktail is phenomenal. The bartenders really know their craft.",
    date: "2 weeks ago",
  },
  {
    id: 9,
    name: "Tola B.",
    rating: 5,
    text: "The beef tenderloin is one of the best I've had in Lagos. Cooked to perfection. The fine dining experience here is truly world-class.",
    date: "1 month ago",
  },
  {
    id: 10,
    name: "Kemi S.",
    rating: 4,
    text: "Beautiful restaurant with an extensive menu. Love that they have everything from Nigerian dishes to international cuisine. Highly recommend the jollof rice!",
    date: "2 months ago",
  },
  {
    id: 11,
    name: "Dayo R.",
    rating: 5,
    text: "Casper & Gambini's never disappoints. Consistent quality, beautiful presentation, and the staff always remember your preferences. True hospitality.",
    date: "3 weeks ago",
  },
  {
    id: 12,
    name: "Simi J.",
    rating: 4,
    text: "Great for late-night dining since they're open till 2 AM. The pepper soup hits different at midnight! Cozy atmosphere even late.",
    date: "1 month ago",
  },
];

export const overallRating = 4.4;
export const totalReviews = 1247;
