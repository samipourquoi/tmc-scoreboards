import React, { useState } from "react";
import { GET } from "../typings/api";
import { SearchBar } from "./search-bar";
import "./styles/scoreboard.scss";
import { ServerBar } from "./server-bar";

export function Scoreboard() {
	const [ server, setServer ] = useState("Global");

	const [ entries, setEntries ] = useState([] as GET.ScoreboardEntry[]);

	return (
		<div id="scoreboard">
			<ServerBar serverState={[server, setServer]}/>

			<div className="card">
				<SearchBar
					server={ server }
					onObjectiveChange={ setEntries }
				/>

				<ul className="scores">
					{ entries.map(({ user, score }) => (
						<li key={ user }>
							<div className="key">{ user }</div>
							<div className="value">{ score }</div>
						</li>
					)) }
				</ul>
			</div>
		</div>
	)
}