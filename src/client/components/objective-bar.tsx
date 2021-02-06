import React, { useState } from "react";
import "./styles/search-bar.scss";
import { isValidObjective, ObjectiveType } from "../typings/objectives";
import { GET } from "../typings/api";

type Cache = {
	[objective: string]: {
		[server: string]: GET.ScoreboardEntry[]
	}
}

export function ObjectiveBar(props: {
	server: string,
	onObjectiveChange:
		(entries: GET.ScoreboardEntry[]) => void
}) {
	const [ cache, setCache ] = useState({} as Cache);

	const fetchObjective = async (objective: string) => {
		if (cache[objective] && cache[objective][props.server]) {
			props.onObjectiveChange(cache[objective][props.server]);
		} else {
			const response = await fetch(`/api/${ objective }/${ props.server.toLowerCase() }`);
			try {
				const json = await response.json();
				cache[objective] = {
					[props.server]: json,
					...cache[objective] || []
				};

				// i don't know if this is really necessary
				setCache(cache);
				props.onObjectiveChange(json);
			} catch (e) {
				console.error("bad response from server", e);
			}
		}
	}

	const updateObjective = (objective: string) => {
		if (isValidObjective(objective)) {
			fetchObjective(objective);
		}
	}

	// @ts-ignore
	updateObjective(document.getElementById("search-bar")?.value || "");

	return (
		<>
			<label htmlFor="search-bar"/>
			<input onChange={ event => updateObjective(event.target.value)}
				   id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}