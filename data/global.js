// Merges every player from all servers
let serverNames = ["EndTech", "Ingenium", "MelonTech", "Hypnos", "Hekate"]

let servers = [endtech, ingenium, melontech, hypnos, hekate]
let global = {}
for (let i = 0; i < servers.length; i++) {
	let server = servers[i]
	let objectives = Object.keys(server)

	for (let j = 0; j < objectives.length; j++) {
		let objective = server[objectives[j]]
		let names = Object.keys(objective)

		if (global[objectives[j]] == undefined) global[objectives[j]] = {}

		for (let k = 0; k < names.length; k++) {
			let name = names[k]
			let score = objective[name]

			if (global[objectives[j]][name] == undefined) global[objectives[j]][name] = 0

			global[objectives[j]][name] += score
		}
	}
}