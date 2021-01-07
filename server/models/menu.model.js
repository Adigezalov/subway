const mongoose = require('mongoose')

const Schema = mongoose.Schema

const menuSchema = new Schema({
	menuItems: [
		{
			menuItem: {
				ref: 'menuItems',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			items: [
				{
					product: {
						ref: 'products',
						type: Schema.Types.ObjectId,
					},
					assemblyDiagram: {
						ref: 'assemblyDiagrams',
						type: Schema.Types.ObjectId,
					},
					modifiers: [
						{
							value: {type: String},
							surcharge: {type: Number},
							active: {type: Boolean},
						},
					],
					position: {type: Number},
					active: {type: Boolean},
					price: {type: Number},
				},
			],
		},
	],
	breads: [
		{
			bread: {
				ref: 'breads',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
		},
	],
	vegetables: [
		{
			vegetable: {
				ref: 'vegetables',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
		},
	],
	sauces: [
		{
			sauce: {
				ref: 'sauces',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
		},
	],
	spices: [
		{
			spice: {
				ref: 'spices',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
		},
	],
	extras: [
		{
			extra: {
				ref: 'extras',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	sixInches: [
		{
			unit: {
				ref: 'units',
				type: Schema.Types.ObjectId,
			},
			assemblyDiagram: {
				ref: 'assemblyDiagrams',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	footLongs: [
		{
			unit: {
				ref: 'units',
				type: Schema.Types.ObjectId,
			},
			assemblyDiagram: {
				ref: 'assemblyDiagrams',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	salads: [
		{
			unit: {
				ref: 'units',
				type: Schema.Types.ObjectId,
			},
			assemblyDiagram: {
				ref: 'assemblyDiagrams',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	wraps: [
		{
			unit: {
				ref: 'units',
				type: Schema.Types.ObjectId,
			},
			assemblyDiagram: {
				ref: 'assemblyDiagrams',
				type: Schema.Types.ObjectId,
			},
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	promotions: [
		{
			promotion: {
				ref: 'promotions',
				type: Schema.Types.ObjectId,
			},
			assemblyDiagram: {
				ref: 'assemblyDiagrams',
				type: Schema.Types.ObjectId,
			},
			modifiers: [
				{
					value: {type: String},
					surcharge: {type: Number},
					active: {type: Boolean},
				},
			],
			position: {type: Number},
			active: {type: Boolean},
			price: {type: Number},
		},
	],
	restaurant: {
		ref: 'restaurants',
		type: Schema.Types.ObjectId,
	},
	user: {
		ref: 'users',
		type: Schema.Types.ObjectId,
	},
})

module.exports = mongoose.model('menus', menuSchema)
