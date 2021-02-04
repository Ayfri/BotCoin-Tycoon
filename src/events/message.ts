import {CommandHandler, getThing, Event, permissionsError, argError, Tag, Logger} from 'advanced-command-handler';
import {Message} from 'discord.js';

export default new Event(
	{
		name: 'message'
	},
	async (handler: typeof CommandHandler, message: Message): Promise<any> => {
		if (message.author.bot || message.system) return;
		
		const prefix = CommandHandler.getPrefixFromMessage(message);
		if (!prefix) return;
		
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
		const command = await getThing('command', cmd.toLowerCase().normalize());
		if (command.isInCooldown(message)) {
			const cooldown = command.getCooldown(message);
			if (command.name === 'boost') return message.channel.send(`Veuillez attendre encore ${cooldown.waitMore.toFixed(1)} secondes avant de pouvoir rebooster.`);
			else return message.channel.send(`Veuillez attendre encore ${cooldown.waitMore} sencondes pour pouvoir ré-executer cette commande.`);
		}
		
		if (command) {
			command.setCooldown(message);
			if (!command.isInRightChannel(message)) return message.channel.send(`This command is not in the correct channel.`);
			
			const missingPermissions = command.getMissingPermissions(message);
			const missingTags = command.getMissingTags(message);
			
			if (missingPermissions.client.length) return permissionsError(message, missingPermissions.client, command, true);
			if (missingPermissions.user.length) return permissionsError(message, missingPermissions.user, command);
			
			if (missingTags.length)
				return argError(
					message,
					`There are missing tags for the message: \n\`${missingTags
						.map((tag: Tag) => Tag[tag])
						.sort()
						.join('\n')
						.toUpperCase()}\``,
					command
				);
			try {
				await command.run(handler, message, args);
				Logger.log(`${message.author.tag} has executed the command ${Logger.setColor('red', command.name)}.`);
			} catch (error) {
				Logger.warn(error);
			}
		}
	}
);
