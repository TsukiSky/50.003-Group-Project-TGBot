import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import {ICommand} from "wokcommands";

import {deleteGameMap} from "../../abstract_commands/pools/delete_map";
import {ensure} from "../../utils/general";

export default {
    category: "Admin",
    description: "Remove a map from the server",
    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "map_uuid",
            description: "The uuid of the map to remove",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true,
        },
    ],

    callback: async ({interaction}) => {
        const {options, channelId, guildId} = interaction;

        // ensure that the command is being run in a server
        if (!channelId || !guildId) {
            return "This command can only be run in a text channel in a server";
        }

        // get the command parameters
        const mapUuid = ensure(options.getInteger("map_uuid"));

        return await deleteGameMap(mapUuid, guildId);
    },
} as ICommand;