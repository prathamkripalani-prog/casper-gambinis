import { MenuCategory } from "./foodMenu";

export const beverageMenu: MenuCategory[] = [
  {
    title: "Coffee",
    items: [
      { name: "Espresso", description: "Aromatic straight shot.", price: 4000 },
      { name: "Ristretto", description: "Aromatic straight shot.", price: 4000 },
      { name: "Lungo", description: "Aromatic straight shot.", price: 4000 },
      { name: "Doppio", description: "Double espresso shot.", price: 5500 },
      { name: "Cappuccino", description: "Espresso with steamed milk and creamy foam.", price: 6000 },
      { name: "Americano", price: 5500 },
      { name: "Café Latte", description: "Espresso with steamed milk and light foam.", price: 6000 },
      { name: "Caramel Latte", description: "Latte with caramel sauce and fresh whipped cream.", price: 10000 },
      { name: "Chocolate & Beyond", description: "Rich and indulgent hot chocolate.", price: 5000 },
      { name: "Mocafé Cool", description: "Blended Mocafé with milk.", price: 16000 },
      { name: "Frosted Ice Latte", description: "Golden coffee blended with honey over smooth vanilla-infused milk.", price: 10000 },
    ],
  },
  {
    title: "Tea & More",
    items: [
      { name: "Southern Mint Iced Tea", description: "Southern mint tea with citrus, sugar, cinnamon, and fresh mint.", price: 9000 },
      { name: "Bombay Chai Iced Tea", description: "Bombay chai tea with citrus, fresh mint, and cinnamon.", price: 9000 },
      { name: "Homemade Iced Tea", description: "Your choice of lemon or peach.", price: 9000 },
      { name: "Revolution Tea", description: "Premium infused tea selection.", price: 5000 },
    ],
  },
  {
    title: "Refreshments",
    items: [
      { name: "Freshly Squeezed Juice", description: "Choice of orange, carrot, apple, carrot-ginger, or pineapple.", price: 8000 },
      { name: "Fresh Lemonade", description: "Original, mint, on ice, or frozen.", price: 8000 },
      { name: "Fruit Smoothies", description: "Strawberry, Kiwi-Apple, Mango, Strawberry-Banana, or Red Berries.", price: 8500 },
      { name: "Ginger Mojito Cooler", description: "Ginger ale, mojito syrup, fresh mint, and lemon.", price: 10000 },
      { name: "Pomegranate Mojito Cooler", description: "Pomegranate syrup, mojito syrup, lemon juice, mint, and soda water.", price: 10000 },
      { name: "Lemon Curacao Cooler", description: "Blue curaçao syrup, Sprite, and fresh lemon.", price: 10000 },
      { name: "Berry Mix Cooler", description: "Cranberry juice, raspberry syrup, soda water, and lemon.", price: 10000 },
      { name: "Chapman", price: 8000 },
    ],
  },
  {
    title: "Milkshakes",
    items: [
      { name: "Chocolate Shake", price: 16000 },
      { name: "Vanilla Shake", price: 16000 },
      { name: "Strawberry Shake", price: 16000 },
    ],
  },
  {
    title: "Soft Drinks",
    items: [
      { name: "Coca-Cola", price: 3000 },
      { name: "Coca-Cola Zero", price: 3000 },
      { name: "Sprite", price: 3000 },
      { name: "Fanta", price: 3000 },
      { name: "Schweppes Soda", price: 3000 },
      { name: "Schweppes Bitter Lemon", price: 3000 },
      { name: "Schweppes Tonic", price: 3000 },
      { name: "Red Bull", price: 5000 },
      { name: "Perrier", price: 9000 },
      { name: "Mineral Water (Small)", price: 2500 },
      { name: "Mineral Water (Large)", price: 4000 },
    ],
  },
  {
    title: "Juice Pitchers",
    items: [
      { name: "Apple Juice Pitcher", price: 15000 },
      { name: "Cranberry Juice Pitcher", price: 15000 },
      { name: "Orange Juice Pitcher", price: 15000 },
      { name: "Pineapple Juice Pitcher", price: 15000 },
    ],
  },
  {
    title: "White Wine",
    items: [
      { name: "White Wine (Glass)", price: 13000 },
      { name: "Ksara Blanc de Blanc", price: 80000 },
      { name: "Leopard's Leap Chardonnay", price: 60000 },
      { name: "Blue Nun Authentic White", price: 50000 },
    ],
  },
  {
    title: "Red Wine",
    items: [
      { name: "Red Wine (Glass)", price: 13000 },
      { name: "Ksara Réserve du Couvent", price: 80000 },
      { name: "Leopard's Leap Cabernet Sauvignon", price: 55000 },
      { name: "Blue Nun Merlot", price: 45000 },
      { name: "Blue Nun Cabernet", price: 45000 },
      { name: "Linton Shiraz", price: 60000 },
      { name: "Kopke Ruby Port", price: 70000 },
      { name: "Kopke Tawny Port", price: 70000 },
    ],
  },
  {
    title: "Rosé Wine",
    items: [
      { name: "Rosé Wine (Glass)", price: 13000 },
      { name: "Ksara Sunset", price: 80000 },
      { name: "Tulipa Rosé", price: 45000 },
      { name: "Darling Cellars Pyjama Bush", price: 60000 },
      { name: "Rhino Sweet Rosé", price: 50000 },
    ],
  },
  {
    title: "Champagne",
    items: [
      { name: "GH Mumm Brut", price: 180000 },
      { name: "GH Mumm Demi-Sec Rosé", price: 220000 },
      { name: "Veuve Clicquot Brut", price: 300000 },
      { name: "Veuve Clicquot Rich", price: 400000 },
      { name: "Veuve Clicquot Rosé", price: 350000 },
      { name: "Moët & Chandon Brut", price: 250000 },
      { name: "Moët & Chandon Ice", price: 340000 },
      { name: "Moët & Chandon Nectar Rosé", price: 320000 },
      { name: "Angelus Rosé", price: 150000 },
      { name: "Ace of Spades", price: 1100000 },
      { name: "Dom Pérignon Brut", price: 1000000 },
    ],
  },
  {
    title: "Cognac",
    items: [
      {
        name: "Martell VS",
        sizes: [
          { label: "Glass", price: 16000 },
          { label: "Bottle", price: 160000 },
        ],
      },
      {
        name: "Martell Blue Swift",
        sizes: [
          { label: "Glass", price: 28000 },
          { label: "Bottle", price: 280000 },
        ],
      },
      { name: "Martell XO", price: 700000 },
      { name: "Martell XXO", price: 1000000 },
      { name: "Rémy Martin 1738", price: 280000 },
      {
        name: "Hennessy VS",
        sizes: [
          { label: "Glass", price: 16000 },
          { label: "Bottle", price: 160000 },
        ],
      },
      {
        name: "Hennessy VSOP",
        sizes: [
          { label: "Glass", price: 28000 },
          { label: "Bottle", price: 300000 },
        ],
      },
      { name: "Hennessy XO", price: 750000 },
    ],
  },
  {
    title: "Whiskey",
    items: [
      {
        name: "Jameson Black Barrel",
        sizes: [
          { label: "Glass", price: 15000 },
          { label: "Bottle", price: 120000 },
        ],
      },
      {
        name: "Chivas 12 Years",
        sizes: [
          { label: "Glass", price: 12000 },
          { label: "Bottle", price: 100000 },
        ],
      },
      {
        name: "Chivas XV (15 Years)",
        sizes: [
          { label: "Glass", price: 15000 },
          { label: "Bottle", price: 150000 },
        ],
      },
      {
        name: "Chivas 18 Years",
        sizes: [
          { label: "Glass", price: 20000 },
          { label: "Bottle", price: 200000 },
        ],
      },
      {
        name: "Glenlivet",
        sizes: [
          { label: "15 Years", price: 250000 },
          { label: "18 Years", price: 350000 },
          { label: "21 Years", price: 950000 },
        ],
      },
      {
        name: "Glenfiddich",
        sizes: [
          { label: "15 Years — Glass", price: 24000 },
          { label: "15 Years — Bottle", price: 240000 },
          { label: "18 Years — Glass", price: 30000 },
          { label: "18 Years — Bottle", price: 350000 },
          { label: "21 Years", price: 900000 },
          { label: "22 Years", price: 1000000 },
        ],
      },
      { name: "Macallan 15 Years", price: 400000 },
      {
        name: "Johnnie Walker",
        sizes: [
          { label: "Black Label — Glass", price: 12000 },
          { label: "Black Label — Bottle", price: 120000 },
          { label: "Gold Label — Glass", price: 16000 },
          { label: "Gold Label — Bottle", price: 160000 },
          { label: "Green Label", price: 250000 },
          { label: "18 Blended", price: 300000 },
          { label: "Blue Label", price: 600000 },
        ],
      },
      {
        name: "The Singleton",
        sizes: [
          { label: "12 Years — Glass", price: 15000 },
          { label: "12 Years — Bottle", price: 150000 },
          { label: "15 Years", price: 250000 },
          { label: "18 Years", price: 300000 },
        ],
      },
      {
        name: "Gold Bar",
        sizes: [
          { label: "Original", price: 280000 },
          { label: "Black", price: 300000 },
        ],
      },
      {
        name: "Jack Daniel's",
        sizes: [
          { label: "Old No. 7 — Glass", price: 10000 },
          { label: "Old No. 7 — Bottle", price: 85000 },
          { label: "Honey", price: 85000 },
          { label: "Gentleman Jack", price: 100000 },
          { label: "Woodford Reserve", price: 90000 },
          { label: "Single Barrel", price: 130000 },
        ],
      },
      {
        name: "Akashi",
        sizes: [
          { label: "Blended", price: 100000 },
          { label: "Sherry Cask Finish", price: 170000 },
        ],
      },
      { name: "Tomatin Legacy", price: 100000 },
    ],
  },
  {
    title: "Tequila",
    items: [
      { name: "Tequila Blanco (Shot)", price: 5000 },
      { name: "Olmecca White", price: 100000 },
      { name: "Volcan Blanco", price: 220000 },
      { name: "Casa Maestri Reposado", price: 250000 },
      { name: "Casamigos Reposado", price: 400000 },
      {
        name: "Aman",
        sizes: [
          { label: "Blanco", price: 300000 },
          { label: "Rosa Blanco", price: 300000 },
          { label: "Reposado", price: 300000 },
          { label: "Añejo", price: 750000 },
          { label: "Cristalino", price: 800000 },
        ],
      },
      {
        name: "Don Julio",
        sizes: [
          { label: "Blanco", price: 350000 },
          { label: "Reposado", price: 380000 },
          { label: "1942", price: 800000 },
        ],
      },
      { name: "Clase Azul Reposado", price: 700000 },
      { name: "Avión Cristalino", price: 700000 },
    ],
  },
  {
    title: "Vodka",
    items: [
      {
        name: "Ciroc",
        sizes: [
          { label: "Glass", price: 12000 },
          { label: "Bottle", price: 100000 },
        ],
      },
      { name: "Belvedere", price: 200000 },
      { name: "Belvedere Smogóry Forest", price: 260000 },
    ],
  },
  {
    title: "Gin",
    items: [
      {
        name: "Bombay Sapphire",
        sizes: [
          { label: "Glass", price: 9000 },
          { label: "Bottle", price: 80000 },
        ],
      },
      {
        name: "Hendrick's",
        sizes: [
          { label: "Glass", price: 15000 },
          { label: "Bottle", price: 150000 },
        ],
      },
      {
        name: "Inverroche Classic",
        sizes: [
          { label: "Glass", price: 15000 },
          { label: "Bottle", price: 150000 },
        ],
      },
      { name: "Monkey 47", price: 110000 },
      { name: "Tanqueray No. 10", price: 150000 },
    ],
  },
  {
    title: "Assorted Spirits",
    items: [
      {
        name: "Baileys Irish Cream",
        sizes: [
          { label: "Glass", price: 9000 },
          { label: "Bottle", price: 85000 },
        ],
      },
      {
        name: "Martini",
        sizes: [
          { label: "Extra Dry — Glass", price: 9000 },
          { label: "Extra Dry — Bottle", price: 70000 },
          { label: "Bianco — Glass", price: 9000 },
          { label: "Bianco — Bottle", price: 70000 },
          { label: "Rosso — Glass", price: 9000 },
          { label: "Rosso — Bottle", price: 70000 },
        ],
      },
      {
        name: "Jägermeister",
        sizes: [
          { label: "Shot", price: 6000 },
          { label: "Bottle", price: 70000 },
        ],
      },
    ],
  },
  {
    title: "Stout & Beer",
    items: [
      { name: "Heineken (Can)", price: 4500 },
      { name: "Heineken (Bottle)", price: 4500 },
      { name: "Guinness", price: 4500 },
      { name: "Desperados", price: 4500 },
      { name: "Tiger Beer", price: 4500 },
      { name: "Goldberg Beer", price: 4500 },
      { name: "Draft Beer", price: 5000 },
    ],
  },
  {
    title: "Signature Cocktails",
    items: [
      { name: "Ginger Mojito", price: 10000 },
      { name: "Pomegranate Mojito", price: 10000 },
      { name: "Lemon Curacao", price: 10000 },
      { name: "Berry Mix", price: 10000 },
      { name: "Nutella Martini", price: 12000 },
      { name: "Blue Agave Sour", price: 12000 },
      { name: "Gold Rush", description: "Johnnie Walker Gold Label with fresh lemon and silky honey.", price: 19000 },
    ],
  },
  {
    title: "Fruity Cocktails",
    items: [
      { name: "Sex on the Beach", price: 10000 },
      { name: "Mai Tai", price: 10000 },
      { name: "32 River Park", price: 10000 },
      { name: "Pain Killer", price: 10000 },
      { name: "The Singleton Breeze", price: 13000 },
    ],
  },
  {
    title: "Margaritas",
    items: [
      { name: "Classic Margarita", price: 10000 },
      { name: "Blue Margarita", price: 12000 },
      { name: "Tropical Margarita", price: 10500 },
      { name: "Blueberry Coconut Margarita", price: 12000 },
    ],
  },
  {
    title: "Classic Cocktails",
    items: [
      { name: "Piña Colada", price: 10000 },
      { name: "Scream Out", price: 22000 },
      { name: "Strawberry Daiquiri", price: 10000 },
      { name: "Mojito", price: 10000 },
      { name: "Strawberry Mojito", price: 10000 },
      { name: "Tequila Sunrise", price: 10000 },
      { name: "Sangria", price: 12000 },
      { name: "Espresso Martini", price: 10000 },
      { name: "Honey Espresso", price: 11000 },
    ],
  },
  {
    title: "Fizzes & Sours",
    items: [
      { name: "Long Island", price: 12000 },
      { name: "Bird on a Stick", price: 10000 },
      { name: "Blue Lagoon", price: 10000 },
      { name: "The Singleton Whiskey Sour", price: 16000 },
    ],
  },
  {
    title: "Shots",
    items: [
      { name: "B-52", price: 6000 },
      { name: "Brain Hemorrhage", price: 5000 },
      { name: "Death of a Jellyfish", price: 5000 },
      { name: "Doo Doo", price: 5000 },
      { name: "Monkey Brain", price: 5000 },
    ],
  },
];

export const beverageCategories = beverageMenu.map((c) => c.title);
