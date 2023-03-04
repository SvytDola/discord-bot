import {ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

import {Role} from "../../enum/role.mjs";
import {EMBED_COLOR} from "../../config/index.mjs";


const StringIsNumber = (value: any) => {
    return isNaN(Number(value));
};

const iconUrl = "https://cdn.discordapp.com/attachments/606107088485089295/1081514456972013649/photo_2022-11-24_16-58-24.jpg"

export async function listOfRoles(interaction: ChatInputCommandInteraction) {
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
        .setAuthor({
            iconURL: iconUrl,
            name: "Svyt Dola#2666"
        })
        .setFields(fields)
        .setTimestamp()

    await interaction.reply({embeds: [embed]})
}
