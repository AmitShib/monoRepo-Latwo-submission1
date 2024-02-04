export type Order = {
  table_Number: string;
  restaurantId: string;
  order_ID: string;
  consumer_Name: string;
  allergies: string[];
  orders: Dish[];
};

type Dish = {
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
