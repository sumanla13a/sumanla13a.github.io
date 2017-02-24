export class Position {
	x:number;
	y:number;
	isBomb:boolean;
	bombCount:number;
	isRevealed:boolean;
	flagBomb:boolean;
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	setBomb(boolV) {
		this.isBomb = boolV;
	}
	setNearBombCount(count) {
		this.bombCount = count;
	}
	setRevealed(boolV) {
		this.isRevealed = boolV;
	}
	setFlag(boolV) {
		this.flagBomb = boolV;
	}
}

export class Mines {
	board:any;
	rows:any;
	columns: any;
	bombs: number;
	gameOver: boolean = false;
	constructor(difficulty) {
		switch(difficulty) {
			case 'hard':
				this.rows = 30;
				this.columns = 16;
				this.bombs = 99; 
				break;
			case 'medium':
				this.rows = 16;
				this.columns = 16;
				this.bombs = 40; 
				break;
			default:
				this.rows = 8;
				this.columns = 8;
				this.bombs = 10;
		}

		this.board = new Array(this.rows);
		for(let i = 0; i<this.rows; i++) {
			this.board[i] = new Array(this.columns);
			for(let j = 0; j<this.rows; j++) {
				this.board[i][j] = new Position(i, j);
			}
		}
		this.generateBombs();
		this.countBombsForEachPositions	();
	}

	generateBombs() {
		for(let i = 0; i < this.bombs; i++) {
			let ran1 = Math.floor(Math.random() * this.rows);
			let ran2 = Math.floor(Math.random() * this.columns);
			this.board[ran1][ran2] = new Position(ran1, ran2);
			this.board[ran1][ran2].setBomb(true);
		}
	}

	countBombsForEachPositions() {
		this.board.forEach( y => {
			y.forEach( pos => {
				this.board[pos.x][pos.y].setNearBombCount(this.countNumberOfBombsInGivenPosition(pos));
			});
		});
	}

	getAllNeighbors(position):Position[] {
		let positions:Position[] = [];
		if(this.board[position.x - 1]) {
			if(this.board[position.x - 1][position.y + 1]) {
				positions.push(this.board[position.x - 1][position.y + 1]);
			}
			if(this.board[position.x - 1][position.y]) {
				positions.push(this.board[position.x - 1][position.y]);
			}
			if(this.board[position.x - 1][position.y - 1]) {
				positions.push(this.board[position.x - 1][position.y - 1]);
			}
		}

		/* For fields below and up the given position*/
		if(this.board[position.x][position.y - 1]) {
			positions.push(this.board[position.x][position.y - 1]);
		}
		if(this.board[position.x][position.y + 1]) {
			positions.push(this.board[position.x][position.y + 1]);
		}

		/* For fields to the right of given position */
		if(this.board[position.x + 1]) {
			if(this.board[position.x + 1][position.y + 1]) {
				positions.push(this.board[position.x + 1][position.y + 1]);
			}
			if(this.board[position.x + 1][position.y]) {
				positions.push(this.board[position.x + 1][position.y]);
			}
			if(this.board[position.x + 1][position.y - 1]) {
				positions.push(this.board[position.x + 1][position.y - 1]);
			}
		}

		return positions;
	}
	countNumberOfBombsInGivenPosition(position) {
		let count:number = 0;

		let positions:Position[] = this.getAllNeighbors(position);

		positions.forEach( pos => {
			if(pos.isBomb) {
				count ++;
			}
		});

		return count;
	}

	reveal(position) {
		if(!this.gameOver && !position.flagBomb) {
			if(position.isBomb) {
				this.gameOver = true;
				this.displayAllBombs();
			} else {
				if(position.bombCount) {
					position.setRevealed(true);
				} else {
					this.revealAllConnectedZero(position);
				}
			}
		}
		return this.gameOver;
	}

	displayAllBombs() {
		this.board.forEach( y => {
			y.forEach( pos => {
				if(this.board[pos.x][pos.y].isBomb) {
					this.board[pos.x][pos.y].isRevealed = true;
				}
			});
		});
	}

	revealAllConnectedZero(position) {
		this.getAllNeighbors(position).forEach(pos => {
	  		if(!pos.isRevealed) {
		  		if(!pos.isBomb && pos.bombCount === 0) {
		  			pos.setRevealed(true);
		  			this.revealAllConnectedZero(pos);
		  		}
	  		}
	  	});
	}

	tagAsBomb(pos) {
	  	pos.setFlag(!pos.flagBomb);
	}
}