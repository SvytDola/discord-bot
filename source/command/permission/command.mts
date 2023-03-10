import {
    SlashCommandBuilder,
} from "discord.js";

import {BaseCommandSubCommands} from "../base.mjs";

import {RoleAddSubCommand} from "./add.mjs";
import {RoleListSubCommand} from "./list.mjs";
import {RoleRemoveSubCommand} from "./remove.mjs";
export class PermissionCommand extends BaseCommandSubCommands {
    constructor() {
        super(
            new SlashCommandBuilder()
                .setName("permission")
                .setDescription("Permission editor."),
            [
                new RoleAddSubCommand(),
                new RoleListSubCommand(),
                new RoleRemoveSubCommand()]);
    }
}
