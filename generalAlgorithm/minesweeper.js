let rows = 8,
	columns = 8,
	bombs = 10;
class Position {
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
}

class Mines {
	constructor() {
		this.board = new Array(rows);
		for(let i = 0; i<rows; i++) {
			this.board.push(new Array(columns));
		}
		this.generateBombs();
	}

	generateBombs() {
		for(let i = 0; i < bombs; i++) {
			let ran1 = Math.floor(Math.random() * rows);
			let ran2 = Math.floor(Math.random() * columns);
			this.board[ran1][ran2] = new Position(ran1, ran2);
			this.board[ran1][ran2].setBomb(true);
		}
	}

	countBombsForEachPositions() {
		this.board.forEach( y => {
			y.forEach( x => {
				this.board[x][y].setNearBombCount(this.countNumberOfBombsInGivenPosition(new Position(x, y)));
			});
		});
	}

	countNumberOfBombsInGivenPosition(position) {
		let count = 0;
		/* For field to the left to given position*/
		if(this.board[position.x - 1]) {
			if('*' === this.board[position.x - 1][position.y + 1]) {
				count++;
			}
			if('*' === this.board[position.x - 1][position.y]) {
				count++;
			}
			if('*' === this.board[position.x - 1][position.y - 1]) {
				count++;
			}
		}

		/* For fields below and up the given position*/
		if('*' === this.board[position.x][position.y - 1]) {
			count ++;
		}
		if('*' === this.board[position.x][position.y + 1]) {
			count ++;
		}

		/* For fields to the right of given position */
		if('*' === this.board[position.x + 1][position.y + 1]) {
			count++;
		}
		if('*' === this.board[position.x][position.y + 1]) {
			count++;
		}
		if('*' === this.board[position.x - 1][position.y + 1]) {
			count++;
		}

		return count;
	}

}