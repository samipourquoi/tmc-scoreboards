import React from "react";
import { render } from "react-dom";
import { Scoreboard } from "./scoreboard";
import "./styles/app.scss";

function App() {
	return (
		<div>
			<header>
				<h1>TMC Scoreboards</h1>

				<div className="explanation">
					<p>Each scoreboard name starts with a prefix, followed by a dash and an item name.</p>

					<p>The prefixes are: <br/>
					<code>m (mined), u (used), d (dropped), c (crafted), b (broken),
					p (picked up), k (killed), kb (killed by)</code><br/>
					e.g.: <code>u-diamond_pickaxe, m-stone, kb-creeper</code></p>

					<p>Additional scoreboards are available too:<br/>
					<code>dig (total amount of blocks mined), picks (total pick uses), shovels (total shovel uses),
						  axes (total axe uses)</code></p>
				</div>
			</header>

			<main>
				<Scoreboard/>
			</main>
		</div>
	)
}

render(<App/>, document.getElementById("app"));