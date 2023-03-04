import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs"

import {addRole, addRoleSubCommand} from "./add.mjs";
import {removeRole, removeRoleSubCommand} from "./remove.mjs";

import {Role} from "../../enum/role.mjs";
import {Roles} from "../../guard/role.mjs";
import {User} from "../../database/model/user.mjs";
import {listOfRoles, listSubCommand} from "./list.mjs";

export class RoleCommand extends BaseCommand {
    data: SlashCommandSubcommandsOnlyBuilder;

    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("role")
            .setDescription("Role editor.")
            .addSubcommand(addRoleSubCommand)
            .addSubcommand(removeRoleSubCommand)
            .addSubcommand(listSubCommand)
    }

    @Roles(Role.ADMIN)
    public async execute(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const subcommand = interaction.options.getSubcommand()
        switch (subcommand) {
            case "add": {
                await addRole(interaction, user)
                break
            }
            case "remove": {
                await removeRole(interaction, user)
                break
            }
            case "list": {
                await listOfRoles(interaction)
                break
            }
        }
    }
}
