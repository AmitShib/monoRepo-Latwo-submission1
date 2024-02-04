export type Order = {
  date: string;
  time: string;
  table_Number: string;
  restaurantId: string;
  order_ID: string;
  consumer_Name: string;
  allergies: string[];
  orders: Dish[];
};

export type Dish = {
  date: string;
  time: string;
  dish_id: string;
  dishName: string;
  dishMainIng: string[];
  price: string;
  discount: string;
  dishSemIng: string[];
  adjustments: string[];
  status: string;
  dishType: DishTypes;
};

type DishTypes = "Kitchen" | "Bar" | "Checker";

// Sample usage
export const order: Order = {
  date: "24/02/99",
  time: "14:30",
  table_Number: "21",
  restaurantId: "44",
  order_ID: "200",
  consumer_Name: "אורי אליש",
  allergies: ["עגבניה", "בצל"],
  orders: [
    {
      date: "18/5/23",
      time: "12:30",
      dishName: "ביצה עלומה",
      dishMainIng: ["ביצה"],
      price: "48.00ֿ₪",
      discount: "0",
      dishSemIng: ["עגבניה", "בצל"],
      adjustments: [" ללא עגבניה", "ללא בצל"],
      status: "Pending",
      dishType: "Kitchen",
      dish_id: "212"
    },
    {
      date: "18/5/23",
      time: "12:30",
      dishName: "מים",
      dishMainIng: [],
      price: "11.00₪",
      discount: "0",
      dishSemIng: [],
      adjustments: [],
      status: "Pending",
      dishType: "Bar",
      dish_id: "2122"
    }
  ]
};
