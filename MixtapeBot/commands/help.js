const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['h','info'],
	usage: '[command name]',
	cooldown: 90,
	execute(message, args) {
		const data = [];
		const { commands } = message.client;
		//FIX possibly
		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			data.push(`**Name:** ${command.name}`);

			if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
			if (command.description) data.push(`**Description:** ${command.description}`);
			if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

			data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
			data.push(commands.map(command => command.name).join(', $commands.map(command => command.description)'));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);
			
			return message.reply(data,{split: true})
		}
	},
};