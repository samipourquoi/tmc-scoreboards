import React, { useEffect, useState } from "react";
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
	const [ tempSearch, setTempSearch ] = useState("");

	const fetchObjective = async () => {
		if (cache[tempSearch] && cache[tempSearch][props.server]) {
			props.onObjectiveChange(cache[tempSearch][props.server]);
		} else {
			const response = await fetch(`/api/${ tempSearch }/${ props.server.toLowerCase() }`);
			try {
				const json = await response.json();
				cache[tempSearch] = {
					[props.server]: json,
					...cache[tempSearch] || []
				};

				// i don't know if this is really necessary
				setCache(cache);
				props.onObjectiveChange(json);
			} catch (e) {
				console.error("bad response from server", e);
			}
		}
	}

	useEffect(() => {
		if (isValidObjective(tempSearch))
			fetchObjective();
	});

	useEffect(() => {
		(async () => {
			const response = await fetch("/api/random");
			const { random } = await response.json() as GET.RandomObjective;
			console.log(random);
			(document.getElementById("search-bar") as HTMLInputElement).value = random;
			setTempSearch(random);
			fetchObjective();
		})();
	}, []);

	return (
		<>
			<label htmlFor="search-bar"/>
			<input onChange={ event => setTempSearch(event.target.value.trim())}
				   id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}