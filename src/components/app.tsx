import React from "react";
import { render } from "react-dom";
import { Scoreboard } from "./scoreboard";
import "./styles/app.scss";

function App() {
	return (
		<main>
			<Scoreboard/>
		</main>
	)
}

render(<App/>, document.getElementById("app"));