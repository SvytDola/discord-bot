import {config} from "dotenv";
import type {Dialect} from "sequelize";
import {readFileSync} from "fs";

config();

const cfg = JSON.parse(readFileSync("./config.json").toString());

export const DISCORD_TOKEN = process.env["DISCORD_TOKEN"]!;
export const DATABASE_NAME = process.env["DATABASE_NAME"]!;
export const DATABASE_USERNAME = process.env["DATABASE_USERNAME"]!;
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"]!;
export const DATABASE_DIALECT = process.env["DATABASE_DIALECT"]! as Dialect;
export const DATABASE_PORT = +process.env["DATABASE_PORT"]!;

export const GUILD_IDS: string[] = cfg["guildIds"];
export const CLIENT_ID: string = cfg["clientId"];
export const EMBED_COLOR = 0x89CFF0;
export const NAME_TOKEN: string = cfg["tokenName"];
