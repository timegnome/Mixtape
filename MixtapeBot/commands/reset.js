
module.exports = {
	name: 'resets',
	description: 'Resets the list of cards for the game',
	cooldown: 30,
	aliases: ['restart']
	args: true,
	execute(message, usedcards, deck){
		while(usedcards.length > 0){
			temp = usedcards.shift();
			deck.push(temp);
			message.reply('The deck has been reset.');
		}
	},
};