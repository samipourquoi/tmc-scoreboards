import React, { useState } from "react";
import { GET } from "../typings/api";
import { SearchBar } from "./search-bar";
import "./styles/scoreboard.scss";

export function Scoreboard() {
	const [ server, setServer ] = useState("");

	const [ entries, setEntries ] = useState([
		{ user: "samipourquoi", score: 1 },
		{ user: "ilmango", score: 1010 }
	] as GET.ScoreboardEntry[]);

	const fetchObjective = async (objective: string) => {
	}

	return (
		<div id="scoreboard">
			<SearchBar fetchObjective={ fetchObjective } />

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