import { State as InventoryState } from '@oh-my-rpg/state-inventory';
import * as RichText from '@oh-my-rpg/rich-text-format';
import { State as WalletState } from '@oh-my-rpg/state-wallet';
declare function render_equipment(inventory: InventoryState): RichText.Document;
declare function render_wallet(wallet: WalletState): RichText.Document;
declare function render_inventory(inventory: InventoryState): RichText.Document;
declare function render_full_inventory(inventory: InventoryState, wallet: WalletState): RichText.Document;
export { render_inventory, render_equipment, render_wallet, render_full_inventory };
