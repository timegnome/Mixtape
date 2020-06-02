module.exports = {
	name: 'next',
	description: 'Prints next scenario card.',
	cooldown: 30,
	aliases: ['skip','n','s']
	args: false,
	execute(message, usedcards, deck){
		arg = deck.shift();
		usedcards.push(arg);
		return message.reply('Scenario Card:\n ${arg}');
	},
};