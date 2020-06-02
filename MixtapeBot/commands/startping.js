module.exports = {
	name: 'ping',
	description: 'Join the game',
	cooldown: 30,
	args: true,
	execute(message, args){
		const role = message.guild.roles.find(args[0]);
		message.channel.send('Mixtape: Game starting ${args[0]}')
	},
};