import React from "react";
import { ScoreboardEntry } from "../typings/api";

export function Scoreboard() {
	const server = "EndTech"
	const entries: ScoreboardEntry[] = [
		{ key: "samipourquoi", value: 1 },
		{ key: "ilmango", value: 1010 }
	]

	return (
		<div id="scoreboard">
			<ul className="scores">
				{ entries.map(entry => (<li>
					<div className="key">{ entry.key }</div>
					<div className="value">{ entry.value }</div>
				</li>)) }
			</ul>
		</div>
	)
}