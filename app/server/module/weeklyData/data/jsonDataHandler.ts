import fs from "fs/promises";
import path from "path";
import process from "process";
import { WeeklyDataType } from "../weeklyData.types";

const dataFilePath = path.resolve(
  process.cwd(),
  "app",
  "server",
  "module",
  "weeklyData",
  "data",
  "data.json"
);

async function ensureFileExists() {
  try {
    await fs.access(dataFilePath);
  } catch (error) {
    console.error(error);
    await fs.writeFile(dataFilePath, JSON.stringify([], null, 2));
  }
}

export async function getAllWeeklyData(): Promise<WeeklyDataType[]> {
  try {
    const fileData = await fs.readFile(dataFilePath, "utf-8");
    const jsonData = JSON.parse(fileData) as WeeklyDataType[];

    jsonData.sort(
      (a, b) => new Date(b.toDate).getTime() - new Date(a.toDate).getTime()
    );

    return jsonData;
  } catch (error) {
    console.error("Error reading data.json:", error);
    return [];
  }
}

export async function updateJsonFile(newData: WeeklyDataType) {
  try {
    await ensureFileExists();

    const fileData = await fs.readFile(dataFilePath, "utf-8");
    let jsonData: WeeklyDataType[] = [];

    try {
      jsonData = JSON.parse(fileData);
    } catch (parseErr) {
      console.error("Error parsing data.json:", parseErr);
    }

    jsonData.push(newData);

    await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error("Error updating data.json:", error);
  }
}
