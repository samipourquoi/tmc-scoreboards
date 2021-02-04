import React from "react";
import "./styles/search-bar.scss";
import { isValidObjective } from "../typings/objectives";

export function SearchBar() {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (isValidObjective(value)) {
			console.log(value);
		}
	};

	return (
		<>
			<label htmlFor="search-bar"/>
			<input onChange={ onChange } id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}