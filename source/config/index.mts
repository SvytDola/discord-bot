import {readFileSync} from "fs";
import type {Dialect} from "sequelize";
import {HexColorString} from "discord.js";

export type Config = {
    guildIds: string[];
    clientId: string;
    tokenName: string;
    commissionPercent: number;
    embedColor: HexColorString;
    token: string;
    faucetTokensNumber: number;
    database: {
        name: string;
        host: string;
        dialect: Dialect;
        username: string;
        password: string;
        port: number;
    }
}

export const cfg: Config = JSON.parse(readFileSync("./config.json").toString());

