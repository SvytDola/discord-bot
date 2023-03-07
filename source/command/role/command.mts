import {
    SlashCommandBuilder,
} from "discord.js";

import {BaseSubCommand} from "../base.mjs";

import {RoleAddSubCommand} from "./add.mjs";
import {RoleListSubCommand} from "./list.mjs";
import {RoleRemoveSubCommand} from "./remove.mjs";



export class RoleCommand extends BaseSubCommand {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("role")
                .setDescription("Role editor."),
            [
                new RoleAddSubCommand(),
                new RoleListSubCommand(),
                new RoleRemoveSubCommand()]);
    }
}
