import images from "../../Tools/ThemeConsts/images";

// Dummy Data

const categoryData = [
  {
    id: 1,
    name: "ארוחות בוקר",
  },
  {
    id: 2,
    name: "כריכים",
  },
  {
    id: 3,
    name: "פסטות",
  },
  {
    id: 4,
    name: "פסטות",
  },
  {
    id: 5,
    name: "שקשוקה",
  },
  {
    id: 6,
    name: "שתיה קלה",
  },
  {
    id: 7,
    name: "שתיה חמה",
  },
];

// Price rating
const affordable = 1;
const fairPrice = 2;
const expensive = 3;

const restaurantData = [
  {
    id: 1,
    name: "גרג ארוחת בוקר",
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
    price: 20,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese, and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 2,
    name: "גרג ארוחת בוקר",
    rating: 4.8,
    categories: [2, 4, 6],
    priceRating: affordable,
    price: 20,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese, and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 3,
    name: "גרג ארוחת בוקר",
    rating: 4.8,
    categories: [3],
    priceRating: affordable,
    price: 20,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese, and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 4,
    name: "גרג ארוחת בוקר",
    rating: 4.8,
    categories: [1, 2],
    priceRating: affordable,
    price: 20,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese, and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  {
    id: 5,
    name: "גרג ארוחת בוקר",
    rating: 4.8,
    categories: [6, 7],
    priceRating: affordable,
    price: 20,
    photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
    courier: {
      avatar: images.avatar_1,
      name: "Amy",
    },
    menu: [
      {
        menuId: 1,
        name: "Crispy Chicken Burger",
        photo: images.crispy_chicken_burger,
        description: "Burger with crispy chicken, cheese, and lettuce",
        calories: 200,
        price: 10,
      },
      {
        menuId: 2,
        name: "Crispy Chicken Burger with Honey Mustard",
        photo: images.honey_mustard_chicken_burger,
        description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
        calories: 250,
        price: 15,
      },
      {
        menuId: 3,
        name: "Crispy Baked French Fries",
        photo: images.baked_fries,
        description: "Crispy Baked French Fries",
        calories: 194,
        price: 8,
      },
    ],
  },
  // Additional restaurants can be added here
];

export { categoryData, restaurantData };