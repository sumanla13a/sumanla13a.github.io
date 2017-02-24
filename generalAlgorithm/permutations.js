'use strict';

let finalList = [];
let actualArray = ['A', 'B', 'C', 'D'];
function permutation(array, finalArray) {
	// console.log(array);
	finalArray = finalArray || [];
	// let len = array.length;
	console.log(finalArray);
	for(let i = 0; i<array.length; i++) {
		let cur = array.splice(i,1);
		if(0 === array.length) {
			finalList.push(finalArray.concat(cur));
		}		
		permutation(array.slice(),finalArray.concat(cur));
		array.splice(i, 0, cur[0]);
	}
}


permutation(JSON.parse(JSON.stringify(actualArray)), []);
console.log(finalList);