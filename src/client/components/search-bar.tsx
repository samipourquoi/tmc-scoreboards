import React, { useState } from "react";
import "./styles/search-bar.scss";
import { isValidObjective, ObjectiveType } from "../typings/objectives";

export function SearchBar(
	{ fetchObjective }:
	{ fetchObjective: (name: string) => void }
) {
	const [ objective, setObjective ] = useState("");

	return (
		<>
			<label htmlFor="search-bar"/>
			<input onChange={ event => {
				setObjective(event.target.value);

				if (isValidObjective(objective))
					fetchObjective(objective);
			}} id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}