import {ChatInputCommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder} from "discord.js"

import {Role} from "../../enum/role.mjs"
import {EMBED_COLOR} from "../../config/index.mjs"
import {BaseCommand} from "../base.mjs"
import {User} from "../../database/model/user.mjs"


const StringIsNumber = (value: any) => {
    return isNaN(Number(value))
};

export class RoleListSubCommand extends BaseCommand {
    public data: SlashCommandSubcommandBuilder

    constructor() {
        super()

        this.data = new SlashCommandSubcommandBuilder()
            .setName("list")
            .setDescription("Return all roles.")
    }

    async execute (interaction: ChatInputCommandInteraction, user: User) {
        const fields: any = []

        for (const val of Object.keys(Role).filter(StringIsNumber)) {
            const field = {
                name: val,
                value: `${Role[val as any]}`
            }
            fields.push(field)
        }

        const embed = new EmbedBuilder()
            .setColor(EMBED_COLOR)
            .setTitle("Permission roles")
            .setDescription("Roles responsible for moderating the bot.")
            .setFields(fields)
            .setTimestamp()

        await interaction.reply({embeds: [embed]})
    }
}
