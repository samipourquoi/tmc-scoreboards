import React, { useState } from "react";
import "./styles/search-bar.scss";
import { isValidObjective, ObjectiveType } from "../typings/objectives";
import { GET } from "../typings/api";

export function SearchBar(props: {
	server: string,
	onObjectiveChange:
		(entries: GET.ScoreboardEntry[]) => void
}) {

	const fetchObjective = async (objective: string) => {
		console.info(`/api/${objective}/${props.server}`);
		const response = await fetch(`/api/${objective}/${props.server}`);

		try {
			props.onObjectiveChange(await response.json());
		} catch (e) {
			console.error("bad response from server", e);
		}
	}

	return (
		<>
			<label htmlFor="search-bar"/>
			<input onChange={ event => {
				if (isValidObjective(event.target.value)) {
					fetchObjective(event.target.value);
				}
			}} id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}