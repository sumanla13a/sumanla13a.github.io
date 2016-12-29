(function() {
	'use strict';
	var usableGrid, gamewon = false, score = 0;
	function addTwoToEmptyBlock() {
		var emptyGrids = {},
			something = false;
		for(var key = 0, len = usableGrid.length; key<len; key++ ) {
			for(var innerKey in usableGrid[key]) {
				if(usableGrid[key][innerKey] === 0) {
					if(!emptyGrids[key]) {
						emptyGrids[key] = [];
					}
					something = true;
					emptyGrids[key].push(innerKey);
				}
				if(usableGrid[key][innerKey] === 2048 && !gamewon) {
					gamewon = true;
					window.$('#wonGame').modal();
				}
			}
		}
		if(something) {
			var keysOfEmptyGrids = Object.keys(emptyGrids);
			var randomKey = Math.floor(Math.random() * keysOfEmptyGrids.length);
			var row = keysOfEmptyGrids[randomKey];
			var randomColumn = Math.floor(Math.random() * emptyGrids[keysOfEmptyGrids[randomKey]].length);
			var column = emptyGrids[keysOfEmptyGrids[randomKey]][randomColumn];
			usableGrid[row][column] = 2;
		}
	}

	function updateScore(newScore) {
		score += newScore;
	}

	function bringItemToFront(obj) {
		var index = obj.currIndex;
		while(usableGrid[obj.key][obj.currIndex] === 0 && index < obj.len - 1) {
			usableGrid[obj.key][obj.currIndex] = usableGrid[obj.key][index + 1];
			usableGrid[obj.key][index + 1] = 0;
			index++;
		}
		index = obj.currIndex;
		while(usableGrid[obj.key][obj.currIndex] !== 0 && index < obj.len - 1) {
			if(usableGrid[obj.key][obj.currIndex] === usableGrid[obj.key][index + 1]) {
				usableGrid[obj.key][obj.currIndex] += usableGrid[obj.key][index + 1];
				updateScore(usableGrid[obj.key][obj.currIndex]);
				usableGrid[obj.key][index + 1] = 0;
				index = index + 1;
			} else if(usableGrid[obj.key][index + 1] !== 0) {
				break;
			}
			index++;
		}
	}

	function bringItemToBack(obj) {
		var index = obj.currIndex;
		while(usableGrid[obj.key][obj.currIndex] === 0 && index > 0) {
			usableGrid[obj.key][obj.currIndex] = usableGrid[obj.key][index - 1];
			usableGrid[obj.key][index - 1] = 0;
			index--;
		}
		index = obj.currIndex;
		while(usableGrid[obj.key][obj.currIndex] !== 0 && index > 0) {
			if(usableGrid[obj.key][obj.currIndex] === usableGrid[obj.key][index - 1]) {
				usableGrid[obj.key][obj.currIndex] += usableGrid[obj.key][index - 1];
				updateScore(usableGrid[obj.key][obj.currIndex]);
				usableGrid[obj.key][index - 1] = 0;
				index = index + 1;
			} else if(usableGrid[obj.key][index - 1] !== 0) {
				break;
			}
			index--;
		}
	}

	function bringItemToBottom(obj) {
		var index = obj.key;
		while(usableGrid[obj.key][obj.currIndex] === 0 && index > 0) {
			usableGrid[obj.key][obj.currIndex] = usableGrid[index - 1][obj.currIndex];
			updateScore(usableGrid[obj.key][obj.currIndex]);
			usableGrid[index - 1][obj.currIndex] = 0;
			index--;
		}
		index = obj.key;
		while(usableGrid[obj.key][obj.currIndex] !== 0 && index > 0) {
			if(usableGrid[obj.key][obj.currIndex] === usableGrid[index - 1][obj.currIndex]) {
				usableGrid[obj.key][obj.currIndex] += usableGrid[index - 1][obj.currIndex];
				updateScore(usableGrid[obj.key][obj.currIndex]);
				usableGrid[index - 1][obj.currIndex] = 0;
				index = index + 1;
			} else if(usableGrid[index - 1][obj.currIndex] !== 0) {
				break;
			}
			index--;
		}	
	}

	function bringItemToTop(obj) {
		var index = obj.key;
		while(usableGrid[index][obj.currIndex] === 0 && index < obj.len - 1) {
			usableGrid[index][obj.currIndex] = usableGrid[index + 1][obj.currIndex];
			usableGrid[index + 1][obj.currIndex] = 0;
			index++;
		}
		index = obj.key;
		while(usableGrid[index][obj.currIndex] !== 0 && index < obj.len - 1) {
			if(usableGrid[index][obj.currIndex] === usableGrid[index + 1][obj.currIndex]) {
				usableGrid[index][obj.currIndex] += usableGrid[index + 1][obj.currIndex];
				usableGrid[index + 1][obj.currIndex] = 0;
				index = index + 1;
			} else if(usableGrid[index + 1][obj.currIndex] !== 0) {
				break;
			}
			index++;
		}
	}

	function moveLeft() {

		var obj;
		var copyUsableGrid = JSON.stringify(usableGrid);
		for(var key in usableGrid) {
			var innerKeys = Object.keys(usableGrid[key]);
			for(var i = 0, len=innerKeys.length; i<len - 1;i++) {
				obj = {
					key: key,
					len: len,
					currIndex: i
				};
				bringItemToFront(obj);
			}
		}
		if(copyUsableGrid !== JSON.stringify(usableGrid)) {
			addTwoToEmptyBlock();
		}
	}

	function moveRight() {
		var copyUsableGrid = JSON.stringify(usableGrid);
		usableGrid.forEach(function(objKey, key) {
			key = usableGrid.length - key - 1;
			var innerKeys = Object.keys(usableGrid[key]);
			for(var i = innerKeys.length - 1, len = innerKeys.length; i>=0;i--) {
				var obj;
				obj = {
					key: key,
					len: len,
					currIndex: i
				};
				bringItemToBack(obj);
			}
		});
		if(copyUsableGrid !== JSON.stringify(usableGrid)) {
			addTwoToEmptyBlock();
		}
	}

	function moveUp() {
		var copyUsableGrid = JSON.stringify(usableGrid);
		usableGrid.forEach(function(objKey, key) {
			key = usableGrid.length - key - 1;
			var innerKeys = Object.keys(usableGrid[key]);
			for(var i = innerKeys.length - 1, len = innerKeys.length; i>=0;i--) {
				var obj;
				obj = {
					key: key,
					len: len,
					currIndex: i
				};
				bringItemToTop(obj);
			}
		});
		if(copyUsableGrid !== JSON.stringify(usableGrid)) {
			addTwoToEmptyBlock();
		}	
	}

	function moveDown() {
		var copyUsableGrid = JSON.stringify(usableGrid);
		usableGrid.forEach(function(objKey, key) {
			key = usableGrid.length - key - 1;
			var innerKeys = Object.keys(usableGrid[key]);
			for(var i = 0, len = innerKeys.length; i<len;i++) {
				var obj;
				obj = {
					key: key,
					len: len,
					currIndex: i
				};
				bringItemToBottom(obj);
			}
		});
		if(copyUsableGrid !== JSON.stringify(usableGrid)) {
			addTwoToEmptyBlock();
		}	
	}

	// 8*8
	function print() {
		for(var key = 0; key< 4; key++) {
			for(var innerKey in usableGrid[key]) {
				document.getElementById(key + '' + innerKey).innerHTML = usableGrid[key][innerKey] || ' ';
			}
		}
		document.getElementById('score').innerHTML = score;
	}

	function start() {
		for(var i = 0; i< 4; i++) {
			var row = '<div class="col-xs-3"  id="'+i+'0"></div>' +
				'<div class="col-xs-3" id="'+i+'1"></div>' +
				'<div class="col-xs-3" id="'+i+'2"></div>' +
				'<div class="col-xs-3" id="'+i+'3"></div>';
			var div = document.createElement('div');
			div.innerHTML = row;
			document.getElementById('game').appendChild(div);
		}
		print();
	}

	var gridBoxes = [
		{
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}, {
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}, {
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}, 	{
			0: 0,
			1: 0,
			2: 0,
			3: 0
		}
	];
	function randomGeneratedInitialValues() {
		var random1 = Math.floor(Math.random()*4);
		var random2 = Math.floor(Math.random()*4);
		var random3 = Math.floor(Math.random()*4);
		var random4 = Math.floor(Math.random()*4);
		usableGrid[random1][random2] = 2;
		usableGrid[random3][random4] = 2;
	}
	(function initialize() {
		usableGrid = JSON.parse(JSON.stringify(gridBoxes));
		randomGeneratedInitialValues();
		gamewon = false;
		score = 0;
		window.onload = start;
		function checkKey(e) {
		    e = e || window.event;
		    // console.log(e);
		    if (e.keyCode === 38) {
		        moveUp();
				print();
		        // up arrow
		    }
		    else if (e.keyCode === 40) {
		       moveDown();
				print();
		        // down arrow
		    }
		    else if (e.keyCode === 37) {
		       	moveLeft();
				print();
		       // left arrow
		    }
		    else if (e.keyCode === 39) {
		       moveRight();
				print();
		       // right arrow
		    }

		}
		window.reset = reset;
		document.onkeydown = checkKey;
	})();
	function reset() {
		usableGrid = JSON.parse(JSON.stringify(gridBoxes));
		randomGeneratedInitialValues();
		gamewon = false;
		score = 0;
		print();
		window.$('#wonGame').modal('hide');
	}
})();




