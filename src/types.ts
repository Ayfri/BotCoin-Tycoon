import {Collection} from 'discord.js';

export interface User {
	readonly totalMoney: number;
	id: string;
	startedAt: number;
	
	money: number;
	moneyInBank: number;
	multiplier: number;
	inventory: Collection<string, Item>;
	
	daily: boolean;
	boost: boolean;
	lastBoost: number;
}

export interface Item {
	id: string;
	name: string;
	description?: string;
	
	multiplier: number;
	price: number;
	rank: number;
}
