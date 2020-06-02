module.exports = {
	name: 'addcard',
	description: 'Creates a new scenario card.',
	cooldown: 20,
	aliases: ['add','ac']
	args: true,
	execute(message, args, deck){
		deck.push(args);
		return message.reply('Scenario Card added to deck.');
	},
};