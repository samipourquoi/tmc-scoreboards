import React from "react";
import { GET } from "../typings/api";
import { SearchBar } from "./search-bar";
import "./styles/scoreboard.scss";

export function Scoreboard() {
	const server = "EndTech"
	const entries: GET.ScoreboardEntry[] = [
		{ user: "samipourquoi", score: 1 },
		{ user: "ilmango", score: 1010 }
	]

	return (
		<div id="scoreboard">
			<SearchBar/>

			<ul className="scores">
				{ entries.map(({ user, score }) => (
					<li key={ user }>
						<div className="key">{ user }</div>
						<div className="value">{ score }</div>
					</li>
				)) }
			</ul>
		</div>
	)
}