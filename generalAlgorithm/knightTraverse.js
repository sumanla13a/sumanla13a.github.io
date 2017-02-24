class Position {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.distance = 0;
	}

	setParent(parent) {
		this.parent = parent;
		this.value = Position.counter;
		Position.counter++;
	}


	setDistance(d) {
		this.distance = d;
	}

	equals(move) {
		return move.x === this.x && move.y === this.y;
	}
}
Position.counter = 0;

class KnightMove {
	constructor(start, end) {
		let fullMap = {};
		this.mainStart = start;
		this.board = new Array(8);
		for(let i = 0; i<8; i++) {
			this.board[i] = new Array(8).fill(0);
		}
		this.findAllPath(start, end, fullMap);
		console.log(this.board[end.x][end.y]);
	}


	findAllPath(start, end, map) {
		let moves = this.getAllPossibleMoves(start);
		moves.forEach(move => {
			if(!map[move.x + '' + move.y]) {
				move.distance = start.distance+1;
				map[move.x + '' + move.y] = move.distance;
				this.board[move.x][move.y] = move.distance;
			}
		});
		moves.forEach(move => {
			if(!this.isAllDone()) {
				this.findAllPath(move, end, map);
			}
		});
	}

	isAllDone() {
		for(let i = 0, len=this.board.length; i<len; i++) {
			for(let j = 0; j<len; j++) {
				if(i === this.mainStart.x && j === this.mainStart.y) {
					continue;
				} else {
					if(this.board[i][j] === 0) {
						return false;
					}
				}
			}
		}
		return true;
	}

	getAllPossibleMoves(start) {
		let x = start.x;
		let y = start.y;
		let moves = [];
		if(this.board[x+2] && 0 === this.board[x+2][y+1]) {
			moves.push(new Position(x+2, y+1));
		}
		if(this.board[x+2] && 0 === this.board[x+2][y-1]) {
			moves.push(new Position(x+2, y-1));
		}
		if(this.board[x-2] && 0 === this.board[x-2][y-1]) {
			moves.push(new Position(x-2, y-1));
		}
		if(this.board[x-2] && 0 === this.board[x-2][y+1]) {
			moves.push(new Position(x-2, y+1));
		}
		if(this.board[x+1] && 0 === this.board[x+1][y+2]) {
			moves.push(new Position(x+1, y+2));
		}
		if(this.board[x+1] && 0 === this.board[x+1][y-2]) {
			moves.push(new Position(x+1, y-2));
		}
		if(this.board[x-1] && 0 === this.board[x-1][y+2]) {
			moves.push(new Position(x-1, y+2));
		}
		if(this.board[x-1] && 0 === this.board[x-1][y-2]) {
			moves.push(new Position(x-1, y-2));
		}
		return moves;
	}
}


let start = new Position(0,0);
let end = new Position(4,2);

new KnightMove(start, end);

