function aaCount() {
	for (var i = 0; i < _arguments.length; i++) {
		print(_arguments[i] + “: “ + (script("select " + _arguments[i] + ".ca;show residues").lines.length-1))
	}
}

function findAA(aac) {
	script INLINE @{"selectionHalos ON; select " + aac + ".ca"}
}

function sCount() {
	var dict = {
		'H': 0,
		"E": 0,
		"T": 0,
		"B": 0,
		"G": 0,
		"I": 0,
		"S": 0
		}

	var L = script("select all; show dssp").lines
	var t = 0

	for (var i = 0; i < L.length + 1; i++) {
		if (L[i] == "SUMMARY:") {
			t = i
			break
		}
	}

	for (var x = t + 1; x < L.length + 1; x++) {
		var n = L[x]
		dict[n[1]] += 1
	}
	var conv = {"H": "a helix", "E": "ext. strand", "T": "Hbonded turn", "B": "B bridge residue", "G": "310 helix", "I": "pi helix", "S": "bend"}
	for (var a IN dict) {
		print(conv[a] + ": " + dict[a])
	}
}

function seqAA(start, end, chain) {
	var sequence = script("select " + start + "-" + end + " and :"  + chain + ";show groups").lines
	result = ""
	for (var i = 1; i < sequence.length - 1; i++) {
		result += sequence[i] + ", "
	}
	
	print(result + sequence[-1])
}


function setup() {
	script INLINE @{“set specular on; set specularpower 50;set diffusepercent 100; set ambientpercent 50; cartoon only; color structure”}
}
