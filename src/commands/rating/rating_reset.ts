import {ApplicationCommandOptionTypes} from "discord.js/typings/enums";
import {ICommand} from "wokcommands";
import {ratingReset} from "../../abstract_commands/ratings/rating_reset";

export default {
    category: "Admin",
    description: "Reset rating for a specific user/leaderboard",

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: "user",
            description: "The user to reset rating for",
            type: ApplicationCommandOptionTypes.USER,
            required: false,
        },
        {
            name: "leaderboard_uuid",
            description: "The leaderboard to reset the rating for",
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
        const user = options.getUser("user");
        const leaderboardUUID = options.getString("leaderboard_uuid") ?? "";

        let discordId = "";
        if (user){
            discordId = user.id;
        }

        return await ratingReset(discordId, leaderboardUUID);
    },
} as ICommand;
