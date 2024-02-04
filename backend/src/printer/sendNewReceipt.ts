import fs from "fs";

import { ThermalPrinter, PrinterTypes, CharacterSet } from "node-thermal-printer";
import config from "config";

import { logger } from "../logger";

import generateNewOrderReceipt from "./createReceiptImg";
import { Order, order } from "./types";

export async function printNewOrder(newOrder) {
  const printerRoute: string = config.get("printer.route");

  const printer = new ThermalPrinter({
    type: PrinterTypes.STAR, // 'star' or 'epson'
    interface: printerRoute,
    options: {
      timeout: 1000
    },
    width: 48, // Number of characters in one line - default: 48
    characterSet: CharacterSet.SLOVENIA, // Character set - default: SLOVENIA
    removeSpecialCharacters: false, // Removes special characters - default: false
    lineCharacter: "-" // Use custom character for drawing lines - default: -
  });

  const receiptImgRoute = generateNewOrderReceipt(newOrder);

  await printer.printImage(receiptImgRoute);
  printer.cut();

  // TODO: delete image after generating

  try {
    await printer.execute();
    logger.info("new receipt send to printer", { text: printer.getText });
  } catch (error) {
    console.error("Print error:", error);
  }
}
