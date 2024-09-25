/*
    This embed builder should be called with Params:
    Based on Params, will build an embed talored for it

    Params:
    - Title
    - Color*
    - Details/Text?

    For localized use (ie: we arent going to distribute this) we can hardcode
    links to have users be directed to fill out a form, be directed for donations,
    etc..
*/

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const templates = require('../../datafile/eventTemplate.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Builds out an event planning embed!')
        .addStringOption(option =>
            option.setName('type')
            .setDescription('Generates an event based type: Game Tournament, Movie Night, IRL event')
            .setRequired(true)
            .addChoices(
                { name: 'Game Tournament', value: 'tournament'},
                { name: 'Movie Night', value: 'movie'},
                { name: 'IRL Event', value: 'irl'},
            )
        ),
    async execute(interaction) {
        /* based on options, construct an embed that follows those options, stored from a .json file */
        const type = interaction.options.getSubcommand()
        const embed = new EmbedBuilder()
            .setDescription('This builds an embed based on an option')
            .setTimestamp()

        switch(type) {
            case 'tournament':
                embed
                    .setColor(templates.tournament.color)
                    .setTitle(templates.tournament.title)
                    .setImage(templates.tournament.imageURL)
                    .setFooter(templates.tournament.footer);
            case 'movie':
                embed
                    .setColor(templates.movie.color)
                    .setTitle(templates.movie.title)
                    .setImage(templates.movie.imageURL)
                    .setFooter(templates.movie.footer);
            case 'irl':
                embed
                    .setColor(templates.irl.color)
                    .setTitle(templates.irl.title)
                    .setImage(templates.irl.imageURL)
                    .setFooter(templates.irl.footer);
            default:
                embed
                    .setColor(0xFFFFFF)
                    .setTitle('Something went wrong')
                    .setFooter('How the fuck did you get here?')
        }
        await interaction.reply({ embeds: [embed]});
    },
};

