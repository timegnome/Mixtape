module.exports = {
	name: 'arg-info',
	description: 'Information about the arguements provided',
	args: true,
	execute(message, args){
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}

		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	},
};