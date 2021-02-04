import React from "react";
import "./styles/search-bar.scss";

import scoreboards from "../../../data/scoreboards.json";

export function SearchBar() {
	return (
		<>
			<label htmlFor="search-bar"/>
			<input id="search-bar" type="text" placeholder="Search…"/>
		</>
	)
}