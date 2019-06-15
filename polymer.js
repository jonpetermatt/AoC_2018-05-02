var fs = require("fs");

function checkUp(current, next) {
	if (next === current.toLowerCase()) {
		return true;
	}
	return false;
}

function checkLow(current, next) {
	if (next === current.toUpperCase()) {
		return true;
	}
	return false;
}

function transfer(i, current_input) {
	if (i === 0) {
		return current_input.substring(2, current_input.length);
	}
	let temp_input = current_input.substring(0, i);
	let next_input = temp_input.concat(current_input.substring(i + 2, current_input.length));
	return next_input;
}


function remove(i, current_input) {
	if (i === 0) {
		return current_input.substring(1, current_input.length);
	}
	let temp_input = current_input.substring(0, i);
	let next_input = temp_input.concat(current_input.substring(i + 1, current_input.length));
	return next_input;
}

let alp = "abcdefghijklmonpqrstuvwxyz";
let up = RegExp("[A-Z]", "u");

let filename = process.argv[2].toString();
let file_input = fs.readFileSync(filename, "utf8");
let org_input = file_input.substring(0, file_input.length - 1);
let shortest = org_input.length;
for (let alp_char = 0; alp_char < alp.length; alp_char++) {
	let current_input = org_input;
	let current_char = alp.charAt(alp_char);
	let triggered = true;
	while (triggered) {
		triggered = false;
		for (let i = 0; i < current_input.length; i++) {
			let watched_char = current_input.charAt(i);
			if (current_char === watched_char) {
				let temp_input = remove(i, current_input);
				current_input = temp_input;
				triggered = true;
				break;
			}
			if (current_char.toUpperCase() === watched_char) {
				let temp_input = remove(i, current_input);
				current_input = temp_input;
				triggered = true;
				break;
			}
		}
	}
	triggered = true;
	while (triggered) {
		triggered = false;
		for (let i = 0; i < current_input.length - 1; i++) {
			let watched_char = current_input.charAt(i)
			let next_char = current_input.charAt(i + 1);
			if (up.test(watched_char)) {
				if (checkUp(watched_char, next_char)) {
					current_input = transfer(i, current_input);
					triggered = true;
					break;
				}
			}
			else {
				if (checkLow(watched_char, next_char)) {
					current_input = transfer(i, current_input);
					triggered = true;
					break;
				}
			}
		}

	}
	if (current_input.length < shortest) {
		shortest = current_input.length;
	}
}
console.log(shortest);
