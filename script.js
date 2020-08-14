// oopsi spaghetti code

let scoreboardCard = document.getElementById("scoreboard")
let scoreboardSearch = document.getElementById("scoreboard_search")
let arrow = document.getElementById("arrow_hitbox")
let serverList = document.getElementById("server_list")
let currentServer = document.getElementById("current_server")
const variableToStats = {
	"ingenium": ingenium,
	"endtech": endtech,
	"melontech": melontech,
	"hypnos": hypnos,
	"global": global
}

setup()

scoreboardSearch.onchange = () => {
	let variableName = currentServer.innerHTML.trim().toLowerCase()
	scoreboardSearch.blur()

	scoreboardSearch.value = scoreboardSearch.value.trim()
	let stats = variableToStats[variableName] === undefined ? {} : variableToStats[variableName]
	update(sort(stats[scoreboardSearch.value]))
}

function setup() {
	let randomObjective = getRandomObjectiveName()
	update(sort(global[randomObjective]))
	scoreboardSearch.value = randomObjective
}

/** Updates scoreboard card. Takes a 2D array of [name, score] */
function update(objective) {
	// Creates two seperate arrays for names and scores
	let names = []
	let scores = []
	for (let i = 0; i < objective.length; i++) {
		names.push(objective[i][0])
		scores.push(objective[i][1])
	}
	names = names.join("<br />")
	scores = scores.join("<br />")

	// Sets the length of the card
	let length = (Object.keys(objective).length - 1)*4400 + 36*2
	scoreboardCard.style.height = length + "px !important"

	// Sets the name of the objective, the name of the players and the scores
	scoreboardCard.children[1].innerHTML = names
	scoreboardCard.children[2].innerHTML = scores
}

/** Sorts an object of scores to a 2D array of [name, score] */
function sort(objective) {
	try {
		let unsorted = Object.entries(objective)
		let sorted = unsorted.sort((a, b) => b[1] - a[1])
		return sorted;
	} catch (e) {
		return [[]];
	}
}

/** Converts objective name to its display name. e.g. u-stone -> Used Stone */
function toDisplayName(objectiveName) {
	let prefix = objectiveName.substring(0, objectiveName.indexOf('-'))
	let type = objectiveName.substring(objectiveName.indexOf('-')+1)

	switch (prefix) {
		case "u":
			return "Used " + snakeToPascal(type)
		case "m":
			return "Mined " + snakeToPascal(type)
		case "b":
			return "Broken " + snakeToPascal(type)
		case "c":
			return "Crafted " + snakeToPascal(type)
		case "d":
			return "Dropped " + snakeToPascal(type)
		case "p":
			return "Picked Up " + snakeToPascal(type)
		case "k":
			return "Killed " + snakeToPascal(type)
		case "kb":
			return "Killed By " + snakeToPascal(type)
	}

	return objectiveName;
}

/** Converts snake_case to Pascal Case */
function snakeToPascal(word) {
    word = word.replace(/_/g, ' ')
    word = word.replace(/\b(\w)/g, function () { return arguments[1].toUpperCase() })
    return word
}

/** Returns a random objective name from the global list */
function getRandomObjectiveName() {
	let objectives = Object.keys(global)
	let random = Math.floor(Math.random() * (objectives.length + 1))
	return objectives[random];
}

// Handles menu appearing/disappearing
arrow.onmouseenter = () => {
	arrow.style.setProperty("transform", "rotate(0deg)")
	serverList.style.setProperty("visibility", "visible")
}

arrow.onmouseleave = () => {
	arrow.style.setProperty("transform", "rotate(-90deg)")
	serverList.style.setProperty("visibility", "hidden")
}

serverList.onmouseenter = () => {
	arrow.style.setProperty("transform", "rotate(0deg)")
	serverList.style.setProperty("visibility", "visible")
}

serverList.onmouseleave = () => {
	arrow.style.setProperty("transform", "rotate(-90deg)")
	serverList.style.setProperty("visibility", "hidden")
}

//
let currentDisplayedServer = "Global"
let selectableServers = new Set()
for (let i = 0; i < serverNames.length; i++) {
	selectableServers.add(serverNames[i])
}
let hoveredServer = ""
let LIs = document.querySelectorAll("#server_list li")
LIs.forEach(setupListeners)

function setupListeners(li) {

	li.addEventListener("mouseover", () => {
		hoveredServer = li.innerHTML
	})

	li.addEventListener("click", () => {
		serverList.onmouseleave()
		currentServer.innerHTML = hoveredServer
		scoreboardSearch.onchange()
	})
}