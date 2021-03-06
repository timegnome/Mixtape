module.exports = {
	name: 'clear',
	description: 'Clears channel messages',
	cooldown: 30,
	aliases: ['clean','prune', 'delete']
	args: true,
	execute(message, args){
		const amount = parseInt(args[0]);
		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		} else if (amount =< 1 || amount > 100) {
			return message.reply('you need to input a number between 1 and 99.');
		}
		message.channel.bulkDelete(amount+1, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};