import {
	Item,
} from '@oh-my-rpg/definitions'

/////////////////////

// can be upgraded later for having bags, etc.
type InventoryCoordinates = number

///////

interface State {
	unslotted_capacity: number
	slotted: {
		[slot: string]: Item | null
	}
	unslotted: Array<Item | null>
}

/////////////////////

export {
	InventoryCoordinates,
	Item,
	State,
}

/////////////////////
