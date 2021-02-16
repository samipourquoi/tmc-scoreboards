import React, { useState } from "react";
import "./styles/server-bar.scss";

type ServerBarProps = {
	serverState: [ server: string, setServer: (server: string) => void ]
}

export function ServerBar({
	serverState: [
		selected,
		setSelected
	]
}: ServerBarProps) {
	const [ selecting, setSelecting ] = useState(false);

	const servers = [
		"Global",
		"EndTech",
		"LiteTech",
		"WaveTech"
	];

	return (
		<div className="server-bar-container">
			<div className="server-bar" onClick={() => setSelecting(!selecting)}>
				<span className="square-thingy">
					{ selecting ? "+" : "-" }
				</span>
				<span className="server-name">{ selected }</span>
			</div>

			<ul className="dropdown" style={ { display: selecting ? "initial" : "none" } }>
				{ servers
					.filter(server => server != selected)
					.map(server => (
						<ServerEntry
							server={ server }
							onChange={ server => {
								setSelected(server);
								setSelecting(false);
							} }
						/>
					)) }
			</ul>
		</div>
	);
}

function ServerEntry(
	{ server, onChange }:
	{ server: string, onChange(server: string): void }
) {

	return (
		<li key={ server }
			onClick={ () => onChange(server) }>
			{ server }
		</li>
	);
}