/////////////////////

import {
	InventorySlot,
} from '@oh-my-rpg/definitions'

import {
	InventoryCoordinates,
	Item,
	State,
} from './types'

/////////////////////

function factory(): State {
	return {
		unslotted_capacity: 20,
		slotted: {},
		unslotted: [
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
		],
	}
}

/////////////////////

// pass the item: can be a hint in case we have "allocated" bags (TODO one day)
function find_unused_coordinates(state: Readonly<State>, item: Readonly<Item>): InventoryCoordinates {
	return state.unslotted.findIndex(item => !item)
}

function auto_sort(state: State): State {
	// no auto-sort for now
	return state
}

/////////////////////

function coordinates_to_string(coordinates: InventoryCoordinates): string {
	return `#${coordinates}`
}

/////////////////////


function add_item(state: State, item: Item): State {
	const coordinates = find_unused_coordinates(state, item)
	if (coordinates < 0)
		throw new Error(`state-inventory: can't add item, inventory is full!`)

	state.unslotted[coordinates] = item

	return auto_sort(state)
}


function remove_item(state: State, coordinates: InventoryCoordinates): State {
	const item_to_remove = get_item_at_coordinates(state, coordinates)
	if (!item_to_remove)
		throw new Error(`state-inventory: can't remove item at ${coordinates_to_string(coordinates)}, not found!`)

	state.unslotted[coordinates] = null

	return auto_sort(state)
}


function equip_item(state: State, coordinates: InventoryCoordinates): State {
	const item_to_equip = get_item_at_coordinates(state, coordinates)
	if (!item_to_equip)
		throw new Error(`state-inventory: can't equip item at ${coordinates_to_string(coordinates)}, not found!`)

	const slot = item_to_equip.slot
	if (slot === InventorySlot.none)
		throw new Error(`state-inventory: can't equip item at ${coordinates_to_string(coordinates)}, not equipable!`)

	const item_previously_in_slot = get_item_in_slot(state, slot) // may be null
	state.slotted[slot] = item_to_equip
	state.unslotted[coordinates] = item_previously_in_slot // whether it's null or not

	return auto_sort(state)
}


function unequip_item(state: State, slot: InventorySlot): State {
	const item_to_unequip = get_item_in_slot(state, slot)
	if (!item_to_unequip)
		throw new Error(`state-inventory: can't unequip item from slot ${slot}, it\'s empty!`)

	const coordinates = find_unused_coordinates(state, item_to_unequip)
	if (coordinates < 0)
		throw new Error(`state-inventory: can't unequip item, inventory is full!`)

	state.slotted[slot] = null
	delete state.slotted[slot]
	state.unslotted[coordinates] = item_to_unequip

	return auto_sort(state)
}

/////////////////////


function get_equiped_item_count(state: Readonly<State>): number {
	return Object.keys(state.slotted).length
}

function get_unequiped_item_count(state: Readonly<State>): number {
	return state.unslotted.filter(i => !!i).length
}
function get_item_count(state: Readonly<State>): number {
	return get_equiped_item_count(state) + get_unequiped_item_count(state)
}

function get_item_at_coordinates(state: Readonly<State>, coordinates: InventoryCoordinates): Item | null {
	return state.unslotted[coordinates] || null
}

function get_item_in_slot(state: Readonly<State>, slot: InventorySlot): Item | null {
	return state.slotted[slot] || null
}



/////////////////////

export {
	InventorySlot,
	InventoryCoordinates,
	Item,
	State,

	factory,
	add_item,
	remove_item,
	equip_item,
	unequip_item,

	get_equiped_item_count,
	get_unequiped_item_count,
	get_item_count,
	get_item_at_coordinates,
	get_item_in_slot,
}

/////////////////////
