export interface MenuItem {
  name: string;
  description?: string;
  price?: number;
  addOns?: { label: string; price: number }[];
  options?: { label: string; price: number }[];
  sizes?: { label: string; price: number }[];
}

export interface MenuCategory {
  title: string;
  items: (MenuItem | { name: string; items: MenuItem[] })[];
}

export const foodMenu: MenuCategory[] = [
  {
    title: "Breakfast",
    items: [
      {
        name: "The English Breakfast",
        description: "Crispy bacon and frankfurter with roasted tomato and mushroom, fried eggs, freshly toasted cereal loaf, and baked beans on the side.",
        price: 19000,
      },
      {
        name: "Gambini's Omelette",
        description: "Fluffy three-egg omelette with cream, salt, and black pepper. Served with roasted potatoes sautéed with fresh spring onions and parsley, topped with crispy bacon and sun-dried tomatoes, alongside toasted cereal loaf.",
        price: 10500,
        addOns: [{ label: "Add Mozzarella", price: 1500 }],
      },
      {
        name: "Egg Benedict",
        description: "Two poached eggs served over toasted bread with garlic-sautéed spinach, silky hollandaise sauce, and a fresh side salad.",
        price: 11000,
      },
      {
        name: "Perfect Pancakes",
        description: "Fluffy homemade pancakes with fresh fruits and your choice of maple syrup or house-made chocolate sauce.",
        price: 12000,
      },
      {
        name: "Yogurt & Fruits",
        description: "Non-fat yogurt with fresh fruits, red fruit sauce, honey, and mixed nuts.",
        price: 14500,
      },
      {
        name: "Croissant (Plain)",
        price: 10000,
      },
    ],
  },
  {
    title: "Soups",
    items: [
      {
        name: "Goat Meat Pepper Soup",
        description: "Traditional Nigerian goat meat pepper soup.",
        price: 18000,
      },
      {
        name: "Chicken Pepper Soup",
        description: "Traditional Nigerian chicken pepper soup.",
        price: 8500,
      },
      {
        name: "Chicken Noodle Soup",
        description: "Poached chicken in fresh vegetable broth with egg noodles, served with garlic croutons.",
        price: 9000,
      },
      {
        name: "Carrot & Ginger Soup",
        description: "Creamy carrot soup with ginger, almonds, pumpkin seeds, fresh cream, and a soft bun.",
        price: 8000,
      },
      {
        name: "Home-Style Lentil Soup",
        description: "Lentil soup prepared with vegetable broth, served with a lemon wedge and garlic croutons.",
        price: 6000,
      },
    ],
  },
  {
    title: "Starters",
    items: [
      {
        name: "Chicken Wings",
        description: "Fried chicken wings with your choice of BBQ or spicy sauce.",
        price: 13500,
      },
      {
        name: "Trio Plantain Beef Tacos",
        description: "Soft plantain tortillas layered with caramelized mozzarella, glazed beef, roasted onions, lettuce, tomato salsa, sauce, and grated mozzarella.",
        price: 18000,
      },
      {
        name: "Asun",
        description: "Spicy smoked goat meat with plantain, green peppers, and onions.",
        price: 19000,
      },
      {
        name: "Peppered Snail",
        description: "Nigerian-style spicy snails sautéed with peppers and onions, served with buffalo-style fried plantains and fresh spring onions.",
        price: 44000,
      },
      {
        name: "Crispy Mac & Cheese",
        description: "Golden-fried mac & cheese fingers served with creamy pesto mayo.",
        price: 9000,
      },
      {
        name: "Garlic Cheese Bread",
        description: "Fresh ciabatta topped with roasted garlic mayo and a three-cheese blend.",
        price: 9000,
      },
      {
        name: "Crispy Calamari",
        description: "Tender baby calamari served with lemon and tartar sauce.",
        price: 12500,
      },
      {
        name: "Spring Rolls",
        description: "Vegetable spring rolls served with sweet chili dip.",
        price: 7500,
      },
      {
        name: "Samosa",
        description: "Beef-filled samosas with carrots and peas, served with sesame mayo.",
        price: 10000,
      },
      {
        name: "Chicken Satay",
        description: "Grilled chicken skewers tossed in satay peanut sauce and fresh coriander.",
        price: 13000,
      },
      {
        name: "Chicken Tenders",
        description: "Crispy panko-coated chicken tenders served with honey mustard dip.",
        price: 10000,
      },
      {
        name: "Tapas Platter",
        description: "A delicious combination of samosas, spring rolls, chicken suya, and breaded mozzarella served with sweet chili dip and creamy island sauce.",
        sizes: [
          { label: "Large (4 pieces each)", price: 30000 },
          { label: "Small (2 pieces each)", price: 16000 },
        ],
      },
      {
        name: "French Fries",
        description: "Golden potato fries served with ketchup.",
        price: 4500,
      },
      {
        name: "Yam Fries",
        description: "Crunchy fried yam served with ketchup.",
        price: 4500,
      },
      {
        name: "Potato Wedges",
        description: "Potato wedges served with ketchup.",
        price: 9500,
      },
    ],
  },
  {
    title: "Salads",
    items: [
      {
        name: "Caesar Salad",
        description: "Romaine lettuce, Caesar dressing, parmesan, and garlic croutons.",
        price: 16000,
        addOns: [
          { label: "Add Chicken", price: 19000 },
          { label: "Add Shrimp", price: 29000 },
        ],
      },
      {
        name: "Greek Salad",
        description: "Iceberg lettuce, tomatoes, cucumbers, onions, olives, feta cheese, thyme, and Greek dressing.",
        price: 14500,
      },
      {
        name: "Quinoa & Kale",
        description: "Grilled chicken, cranberries, carrots, cabbage, green apple, almonds, and sunflower seeds.",
        price: 12500,
      },
      {
        name: "Asian Sesame Chicken",
        description: "Togarashi chicken with Asian vegetables, wonton crisps, peanuts, pickled ginger, and sesame dressing.",
        price: 10000,
      },
      {
        name: "Santa Fe Chicken",
        description: "Roasted chicken breast with mozzarella, mango chutney, corn, red beans, guacamole, tomato salsa, and lemon vinaigrette.",
        price: 19000,
      },
      {
        name: "Crab & Avocado",
        description: "Marinated crab with avocado salsa, mixed greens, rocket leaves, cherry tomatoes, and saffron vinaigrette.",
        price: 19500,
        addOns: [{ label: "Add Prawns", price: 12500 }],
      },
      {
        name: "Spinach Chicken Salad",
        description: "Amaranth spinach, mixed greens, grilled chicken, smoked turkey, emmental cheese, bacon, avocado, almonds, and balsamic dressing.",
        price: 20000,
      },
    ],
  },
  {
    title: "Sandwiches & Wraps",
    items: [
      {
        name: "Chicken Shawarma",
        options: [
          { label: "Naija Style — Shawarma chicken, diced frankfurter, Mary Rose sauce in four mini tortillas with fries and coleslaw.", price: 15000 },
          { label: "Lebanese Style — Marinated chicken wrapped in fresh bread with pickled cucumber and creamy toum, served with fries.", price: 15000 },
        ],
      },
      {
        name: "Boneless Chicken Wrap",
        description: "Crispy chicken strips, cheddar cheese, mayonnaise, BBQ sauce, potato crisps, and lettuce.",
        price: 16000,
      },
      {
        name: "Chicken Quesadillas",
        description: "Grilled chicken, cheese blend, peppers, mushrooms, tortillas, sour cream, guacamole, and fries.",
        price: 24000,
      },
      {
        name: "Chicken Club Sandwich",
        description: "Chicken breast, bacon, eggs, mozzarella, lettuce, tomatoes, pickles, and fries.",
        price: 22000,
      },
      {
        name: "Chicken Suya Sandwich",
        description: "Chicken suya with coleslaw, fried plantain, onions, mayo, and fries.",
        price: 14000,
      },
      {
        name: "Chicken & Avocado",
        description: "Grilled chicken, avocado, spinach, tomatoes, almonds, special sauce, and fries.",
        price: 14000,
      },
      {
        name: "Steak Sandwich",
        description: "Grilled steak with mozzarella, Dijon mustard, balsamic onions, mushrooms, and potato wedges.",
        price: 32000,
      },
    ],
  },
  {
    title: "Pizzas",
    items: [
      {
        name: "Primo Pollo",
        description: "Pulled chicken, pepper marmalade, roasted onions, garlic, tomato sauce, cheese blend, and oregano.",
        price: 16000,
      },
      {
        name: "Classic Pepperoni",
        description: "Italian pork or beef pepperoni with mozzarella, basil, oregano, and house tomato sauce.",
        price: 15000,
      },
    ],
  },
  {
    title: "Burgers",
    items: [
      {
        name: "House Burger",
        description: "Prime beef burger with onions, tomatoes, lettuce, melted cheese, smoked sauce, and fries.",
        price: 15000,
      },
      {
        name: "Chicken Mushroom Burger",
        description: "Grilled chicken breast with mushrooms, cheese, lettuce, tomatoes, mayo, and fries.",
        price: 20000,
      },
      {
        name: "Prawns Burger",
        description: "Grilled prawns, avocado, coriander, ginger pickles, sriracha mayo, and fries.",
        price: 24000,
      },
      {
        name: "Cheesy Smash Burger",
        description: "Four smashed beef patties with cheddar, burger sauce, pickles, and fries.",
        price: 16000,
      },
      {
        name: "Beef Sliders",
        description: "Mini beef burgers with caramelized onions, mozzarella, special sauce, and rocket leaves.",
        price: 11500,
      },
      {
        name: "Teriyaki Chicken Burger",
        description: "Teriyaki chicken breast with crispy vegetables and Japanese sauce, served with fries.",
        price: 14000,
      },
    ],
  },
  {
    title: "Mains",
    items: [
      {
        name: "Beef Tenderloin",
        description: "Grilled beef tenderloin with mashed potatoes, vegetables, and gravy.",
        price: 73000,
      },
      {
        name: "Ginger Salmon",
        description: "Salmon with rice, sweet peppers, kale, tomato-ginger sauce, and soy sauce.",
        price: 31000,
      },
      {
        name: "Chicken Jollof Rice",
        description: "Boneless marinated chicken served with jollof rice and fried plantain.",
        price: 24000,
      },
      {
        name: "Chicken Under a Brick",
        description: "Herb-marinated boneless half chicken with roasted potatoes, seasonal vegetables, and gravy.",
        price: 24000,
      },
      {
        name: "Spicy Fish",
        description: "Nigerian-style grilled fish served with fried rice.",
        price: 35000,
      },
      {
        name: "Prawn Suya",
        description: "Grilled suya prawns with tomatoes, onions, coleslaw, and fries.",
        price: 35000,
      },
      {
        name: "Chicken Escalope",
        description: "Crispy chicken with mozzarella, mashed potatoes, vegetables, and creamy sauce.",
        price: 24000,
      },
      {
        name: "Grilled Chicken Tikka Masala",
        description: "Chicken tikka masala served with jasmine pulao rice, fried onions, and naan.",
        price: 18000,
      },
      {
        name: "Mongolian Chicken",
        description: "Caramelized chicken with sesame seeds served over rice.",
        price: 9500,
      },
      {
        name: "Suya Mixed Grill",
        description: "Beef and chicken skewers with tomatoes, onions, coleslaw, and fries.",
        price: 22000,
      },
      {
        name: "Traditional Fish & Chips",
        description: "Crispy battered fish with tartar sauce, lemon pepper, and fries.",
        price: 22000,
      },
    ],
  },
  {
    title: "Pastas",
    items: [
      {
        name: "Penne Arrabbiata",
        description: "Penne pasta in spicy pomodoro sauce with basil, parmesan, and extra virgin olive oil.",
        price: 13000,
        addOns: [
          { label: "Add Chicken", price: 3000 },
          { label: "Add Prawns", price: 12500 },
        ],
      },
      {
        name: "Spaghetti Bolognese",
        description: "Spaghetti with rich beef Bolognese, tomato sauce, and parmesan.",
        price: 14000,
      },
      {
        name: "Seafood Linguini",
        description: "Mixed seafood with cherry tomatoes, garlic, basil, lemon, parmesan, and cream.",
        price: 23000,
      },
      {
        name: "Chicken Alfredo",
        description: "Linguini with crispy chicken, mushrooms, and parmesan Alfredo sauce.",
        price: 20000,
      },
      {
        name: "Lasagna Bolognese Al Forno",
        description: "Classic beef lasagna with béchamel, mozzarella, and a garden salad.",
        price: 28000,
      },
    ],
  },
  {
    title: "Kids Menu",
    items: [
      {
        name: "Spaghetti & Meatballs",
        price: 9000,
      },
      {
        name: "Mini Cheese Burger",
        price: 11500,
      },
      {
        name: "Mini Chicken Burger",
        price: 10500,
      },
      {
        name: "Mac & Cheese",
        price: 7000,
      },
      {
        name: "Mickey & Minnie Pizza",
        price: 9000,
      },
      {
        name: "Kids Chicken Tenders",
        price: 6000,
      },
    ],
  },
  {
    title: "Desserts",
    items: [
      {
        name: "The Famous Chocolate Cake",
        description: "Rich chocolate cake served with homemade vanilla ice cream.",
        price: 15500,
      },
      {
        name: "Chocolate Fondant",
        description: "Warm molten chocolate cake served with vanilla ice cream.",
        price: 16000,
      },
      {
        name: "Pain Perdu",
        description: "French brioche with crème anglaise, caramel sauce, and vanilla ice cream.",
        price: 16000,
      },
      {
        name: "Fresh Fruit Salad",
        description: "Fresh seasonal fruits with vanilla sauce.",
        price: 11500,
      },
      {
        name: "Apple Crumble",
        description: "Baked apples with cinnamon, walnuts, salted caramel, and vanilla ice cream.",
        price: 17000,
      },
      {
        name: "Homemade Ice Cream",
        description: "Homemade ice cream and seasonal sorbets. Ask your server for today's flavors.",
        price: 10000,
      },
    ],
  },
];

export const menuCategories = foodMenu.map((c) => c.title);
