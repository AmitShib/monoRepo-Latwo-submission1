import { MongoClient } from "mongodb";

import { logger } from "./logger";

const url = "mongodb-string";

export const client = new MongoClient(url);
try {
  client.connect();
  logger.info("Mongo Connected ");
} catch {
  logger.error("Mongo Not Connected");
}

export function check(field, value) {
  if (field === " " && value === " ") {
    return 0;
  } else {
    return 1;
  }
}

export async function listDatabases() {
  //return list of db tables
  const databaseList = await client.db().admin().listDatabases();
  logger.info("databases :");
  databaseList.databases.forEach(db => {
    logger.info(`- ${db.name}`);
  });
}
