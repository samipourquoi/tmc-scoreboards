import scoreboards from "../../../data/scoreboards.json";

export const itemPrefixes = ["u", "d", "p", "b"];
export const blockPrefixes = ["m", ...itemPrefixes];
export const entityPrefixes = ["k", "kb"];
export const statPrefixes = ["z"];
export const prefixes = [...itemPrefixes, ...blockPrefixes, ...entityPrefixes, ...statPrefixes];

export type Prefix = "m" | "u" | "d" | "p" | "b" | "k" | "kb" | "z";
export type ObjectiveType = `${Prefix}-${string}`;

export function isValidObjective(objective: string): objective is ObjectiveType {
	const [,prefix, item] = objective.match(/([mudpbkz]|kb)-(\w+)/) ?? [];
	if (prefix && item) {
	 	return (itemPrefixes.includes(prefix)   ? scoreboards.items   .includes(item) : false) ||
			   (blockPrefixes.includes(prefix)  ? scoreboards.blocks  .includes(item) : false) ||
			   (entityPrefixes.includes(prefix) ? scoreboards.entities.includes(item) : false) ||
			   (statPrefixes.includes(prefix)   ? scoreboards.stats	  .includes(item) : false);
	} else {
		return false;
	}
}