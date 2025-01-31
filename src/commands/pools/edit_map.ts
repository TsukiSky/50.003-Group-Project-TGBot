import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import fetch from "node-fetch";
import {ICommand} from "wokcommands";

import {editMap} from "../../abstract_commands/pools/edit_map";
import {ensure} from "../../utils/general";

export default {
    category: "Admin",
    description: "Edit the name of a map in the server",
    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "map_uuid",
            description: "The uuid of the map to modify",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: true,
        },
        {
            name: "name",
            description: "The new name of the map",
            type: ApplicationCommandOptionTypes.STRING,
            required: false,
        },
        {
            name: "img_link",
            description: "The new link to external image preview of the map",
            type: ApplicationCommandOptionTypes.STRING,
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
        const mapUuid = ensure(options.getInteger("map_uuid"));
        const name = options.getString("name") ?? undefined;
        let imgLink = options.getString("img_link") ?? undefined;

        return await editMap(guildId, mapUuid, {newName: name, newImgLink: imgLink});
    },
} as ICommand;