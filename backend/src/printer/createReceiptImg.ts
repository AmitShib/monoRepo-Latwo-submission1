import * as fs from "fs";

import config from "config";
import { createCanvas } from "canvas";

import { order } from "./types";

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

type Dish = {
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

export type JsonData = Order[];
const restTitle: string = config.get("printer.title");

export default function generateNewOrderReceipt(newOrder: Order): string {
  const canvasWidth = 300;
  const canvasHeight = 150;
  const margin = 20;
  const lineSpacing = 10;
  const fontSize = 15;
  const adjustmentsFontSize = 12;
  const titleFontSize = 30;
  const subTitleFontSize = 20;
  const titleMarginBottom = 40;

  // Create a new canvas
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const context = canvas.getContext("2d");

  // Set font properties
  context.font = `${fontSize}px calibri`;

  // Set initial position for drawing text
  const x = canvasWidth / 2;
  let y = margin + titleFontSize + titleMarginBottom;

  // Draw title
  context.textAlign = "center";
  context.font = `${titleFontSize}px calibri`;
  context.fillText(`${restTitle}-${newOrder.table_Number}`, x, margin + titleFontSize);

  // Set font properties for receipt details
  context.font = `${fontSize}px calibri`;
  context.textAlign = "start";

  // Draw receipt details
  newOrder.orders.forEach(item => {
    context.font = `${fontSize}px calibri`;
    context.textAlign = "start";
    const line = `${item.dishName}`;
    const itemWidth = context.measureText(line).width;
    const itemX = x - itemWidth / 2;
    context.fillText(line, itemX, y);
    y += fontSize + lineSpacing;
    if (item.adjustments.length > 0) {
      context.font = `${adjustmentsFontSize}px calibri`;
      context.textAlign = "start";
      const line = item.adjustments.join(",");
      const itemWidth = context.measureText(line).width;
      const itemX = x - itemWidth / 2;
      context.fillText(line, itemX, y);
      y += fontSize + lineSpacing;
    }
  });

  // Convert canvas to PNG buffer
  const buffer = canvas.toBuffer("image/png");

  // Save the receipt as PNG without a background
  const receiptName = `./src/printer/receipts/receipt-${Date.now().toString()}.png`;
  fs.writeFileSync(receiptName, buffer);
  return receiptName;
}
