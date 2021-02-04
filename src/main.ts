import {CommandHandler} from 'advanced-command-handler';
import {Snowflake} from 'discord.js';
import {config} from 'dotenv';
import Enmap from 'enmap';
import {User} from './types.js';

config();

CommandHandler.create({
	eventsDir: 'dist/events',
	owners: ['386893236498857985'],
	prefixes: ['$'],
	commandsDir: 'dist/commands',
})
	.launch({
		token: process.env.TOKEN,
	});

export const DB = new Enmap<Snowflake, User>({
	autoFetch: true,
	fetchAll: true,
	name: 'money'
})

CommandHandler.on('create', async () => {
	await DB.defer;
});
