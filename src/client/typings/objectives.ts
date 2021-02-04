import scoreboards from "../../../data/scoreboards.json";

export const itemPrefixes = ["u", "d", "p", "b", "c"];
export const blockPrefixes = ["m", ...itemPrefixes];
export const entityPrefixes = ["k", "kb"];
export const statPrefixes = ["z"];
export const prefixes = [...itemPrefixes, ...blockPrefixes, ...entityPrefixes, ...statPrefixes];

export const custom = ["dig", "picks", "shovels", "axes"];

export type Prefix = "m" | "u" | "d" | "p" | "b" | "k" | "kb" | "z" | "c";
export type ObjectiveType = `${Prefix}-${string}` | "dig" | "picks" | "shovels" | "axes";

export function isValidObjective(objective: string): objective is ObjectiveType {
	if (custom.includes(objective)) return true;

	const [,prefix, item] = objective.match(/([mudpbkzc]|kb)-(\w+)/) ?? [];
	if (prefix && item) {
	 	return (blockPrefixes.includes(prefix)  ? scoreboards.blocks  .includes(item) : false) ||
			   (itemPrefixes.includes(prefix)   ? scoreboards.items   .includes(item) : false) ||
			   (entityPrefixes.includes(prefix) ? scoreboards.entities.includes(item) : false) ||
			   (statPrefixes.includes(prefix)   ? scoreboards.stats	  .includes(item) : false);
	} else {
		return false;
	}
}