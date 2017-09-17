import { Outcome, AdventureType } from '../types';
interface RawAdventureArchetypeEntry {
    good: boolean;
    hid: string;
    type?: AdventureType;
    outcome: Partial<Outcome>;
    isPublished?: boolean;
}
declare const ENTRIES: RawAdventureArchetypeEntry[];
export { RawAdventureArchetypeEntry, ENTRIES };
