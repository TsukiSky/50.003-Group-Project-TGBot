import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import {ICommand} from "wokcommands";

import {createQueue} from "../../abstract_commands/queues/create";
import {ensure} from "../../utils/general";

export default {
    category: "Admin",
    description: "Create a TG pickup queue in this channel",

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "name",
            description: "The name of the queue",
            type: ApplicationCommandOptionTypes.STRING,
            required: true,
        },
        {
            name: "num_players",
            description: "The max number of players for the queue",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true,
            minValue: 2,
            maxValue: 8,
        },
        {
            name: "pool_uuid",
            description: "The ID of the pool to be used by the queue",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: false,
        },
    ],

    callback: async ({interaction}) => {
        const {options, channelId, guildId} = interaction;

        // ensure that the command is being run in a server
        if (!channelId || !guildId) {
            return "This command can only be run in a text channel in a server";
        }

        // get the command parameters
        const name = ensure(options.getString("name"));
        const numPlayers = ensure(options.getInteger("num_players"));
        const poolUuid = options.getInteger("pool_uuid") ?? undefined;

        return await createQueue(name, numPlayers, guildId, channelId, poolUuid);
    },
} as ICommand;
