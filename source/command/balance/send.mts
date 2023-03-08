import { CacheType, ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { BaseCommand } from "../base.mjs";
import { NAME_TOKEN } from "../../config/index.mjs";
import { getUserIfNotExistThenCreate } from "../../service/user.mjs";
import { InadequateBalance } from "../../error/balance.mjs";
import { create as createTransaction } from "../../service/transaction.mjs";

export class BalanceSendSubCommand extends BaseCommand<SlashCommandSubcommandBuilder> {
    
    constructor() {
        super(
            new SlashCommandSubcommandBuilder()
                .setName("send")
                .setDescription("Send tokens to user")
                .addNumberOption(option => 
                    option
                        .setName(NAME_TOKEN)
                        .setDescription("Number of token.")
                        .setRequired(true)
                )
                .addUserOption(option => 
                    option
                        .setName("user")
                        .setDescription("Mention.")
                        .setRequired(true)
                )
        );
    }
    
    async execute(interaction: ChatInputCommandInteraction<CacheType>, ...args: any): Promise<void> {
        const userId = interaction.options.getUser("user", true).id;
        const tokens = interaction.options.getNumber(NAME_TOKEN, true)

        const userFrom = await getUserIfNotExistThenCreate(interaction.user.id);
        const userTo = await getUserIfNotExistThenCreate(userId);

        const temp = userFrom.balance - tokens;
        
        if (temp < 0)
            throw new InadequateBalance();
                
        userFrom.balance = temp;
        userTo.balance += tokens;

        await userFrom.save();
        await userTo.save();

        await createTransaction(userFrom.id, userTo.id, tokens);
    }
    
}