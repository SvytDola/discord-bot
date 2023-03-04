import {ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder} from "discord.js";

import {BaseCommand} from "../base.mjs"

import {addRole} from "./add.mjs";
import {removeRole} from "./remove.mjs";

import {Role} from "../../enum/role.mjs";
import {Roles} from "../../guard/role.mjs";
import {User} from "../../database/model/user.mjs";
import {listOfRoles} from "./list.mjs";

export class RoleCommand extends BaseCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;

    constructor() {
        super();
        this.data = new SlashCommandBuilder()
            .setName("role")
            .setDescription("Role editor.")
            .addSubcommand(command =>
                command
                    .setName("add")
                    .setDescription("Add a role to the user.")
                    .addUserOption(option =>
                        option
                            .setName("user")
                            .setDescription("User id.")
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option
                            .setName("role")
                            .setDescription("Role title.")
                            .setRequired(true)
                    )
            )
            .addSubcommand(command =>
                command
                    .setName("remove")
                    .setDescription("Remove a role from a user.")
                    .addUserOption(option =>
                        option
                            .setName("user")
                            .setDescription("User id.")
                            .setRequired(true)
                    )
                    .addStringOption(option =>
                        option
                            .setName("role")
                            .setDescription("Role title.")
                            .setRequired(true)
                    )
            ).addSubcommand(command =>
                command
                    .setName("list")
                    .setDescription("Return all roles.")
            )
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
