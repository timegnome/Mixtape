// Import requried librarys and token
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

// Create client tree for current server
const client = new Discord.Client();
// Add list of bot commands from other files
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
// Create winston for logging program processes
const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', () => logger.log('info', 'The bot is online!'));
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

process.on('uncaughtException', error => logger.log('error', error));

// Initialize up the cooldowns for the commands.
const cooldowns = new Discord.Collection();
const assignedRole;
// Create score table
const users = [];
const usersPoints = [];
const deck = [];
const usedcards = [];

client.once('ready,() =>{
	console.log('Ready!');
});

client.on('message', message => {
//  Check to make sure message is a command
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
//  Convert commandName into usable form
	const args = message.content.slice(prefix.length).split('/ +/');
	const commandName = args.shift().toLowerCase();
	
//  Send commandName to list of commands
	const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
//  Check if the command exists
	if (!client.commands.has(commandName)) 
		if (!command)
			return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

//	Check if the command has a cooldown for the user
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	else {
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
//	Try to execute the command
	try {
		switch (command.name){
			case 'startping':
			
			case 'createrole':
				assignedRole = command.execute(message, args);
				break;
			case 'roleadd':
			case 'roledelete':
				command.execute(message, assignedRole);
				break;
			case 'addcard':
				command.execute(message, args, deck);
				break;
			case 'reset':
				for(u of usersPoints){
					u = 0;
				}
			case 'next':
				command.execute(message, usedcards, deck);
				break;
			case :
			default:
				commands.execute(message, args);
		}
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

	// When grabbing a list of users or any objects check if list is empty for errors on look up.
	if (!message.mentions.users.size) {
		return message.reply('you need to tag a user in order to kick them!');
	}
}
 // message.guild.roles.get(roleID).members.catch(console.error);
client.on('messageReactionAdd', async (reaction, user) =>{
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	index = user.findIndex(reaction.message.author)
	usersPoints[index] += 1;
	// Now the message has been cached and is fully available
	reaction.message.reply(`${reaction.message.author}'s message "${reaction.message.content}" gained a point!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	//console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
	reaction.message.reply('Current score for current game:');
	for( const index = 0; index < users.length; index++){
		reaction.message.reply('\n${users[index]:\t ${usersPoints[index]}}');
	}
});
client.login(token);




/* 
	Get Permissions for channels, reaction messages, messages, pinned messages, add roles and store cards
	Add list of cards in the form of a json and convert to array
	Create 2 lists of arrays for used and unused
	
	Start bot with start command
	Create role to add for the game per user
	Check if role exist
		Get /guilds/{guild.id}/roles
	Create role if it does not exist
		Post /guilds/{guild.id}/roles
	Add roles to users from reactions in a channel
	Post message then check for user reactions
	Put /guilds/{guild.id}/members/{user.id}/roles/{role.id}
	
	Create a log point on request for new game
	Command for card choice
	Command for skip card
	Get channel: GET/channels/{channel.id}
	Get message with reactions: GET/channels/{channel.id}/messages/{message.id}/reactions/{emoji}
		around, before, after message ID
	Post score: POST/channels/{channel.id}/messages
	Add current score of users in the roles
	Add clear game
	Remove roles at end of game
	DELETE/guilds/{guild.id}/members/{user.id}/roles/{role.id}
*/
//https://discordjs.guide/creating-your-bot/commands-with-user-input.html#basic-arguments
