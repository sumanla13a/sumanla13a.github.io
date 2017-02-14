class TicTacToe {

	constructor(state) {
		this.players = {
			maximizer: 'X',
			minimizer: 'O'
		};

		this.currentTurn = this.currentTurn || this.players.maximizer; 
		this.initialize(state);
	}

	initialize(state) {
		this.boardSetup = state || {
			'00':'',
			'01':'',
			'02':'',
			'10':'',
			'11':'',
			'12':'',
			'20':'',
			'21':'',
			'22':''
		};
	}
	
	getRemainingSpots() {
		return Object.keys(this.boardSetup).filter(x => !this.boardSetup[x]);
	}

	nextTurn() {
		this.currentTurn = this.currentTurn === this.players.maximizer ? this.players.minimizer : this.players.maximizer;
		return this.currentTurn;
	}

	isGameComplete() {
		for(let x = 0; x<3; x++) {
			if(this.boardSetup[x+''+0] && this.boardSetup[x+''+0] === this.boardSetup[x+''+1] &&
				this.boardSetup[x+''+0] === this.boardSetup[x+''+2]){
				return {
					complete: true,
					winner: this.boardSetup[x+''+0]
				};
			}
		}
		for(let y = 0; y<3; y++) {
			if(this.boardSetup[0+''+y] && this.boardSetup[0+''+y] === this.boardSetup[1+''+y] &&
				this.boardSetup[0+''+y] === this.boardSetup[2+''+y]){
				return {
					complete: true,
					winner: this.boardSetup[0+''+y]
				};
			}
		}
		if(this.boardSetup['00'] && this.boardSetup['00'] === this.boardSetup['11'] === this.boardSetup['22']) {
			return {
				complete: true,
				winner: this.boardSetup['00']
			};
		}
		if(this.boardSetup['02'] && this.boardSetup['02'] === this.boardSetup['11'] === this.boardSetup['20']) {
			return {
				complete: true,
				winner: this.boardSetup['02']
			};
		}
		return {
			complete: false
		};
	}

	finalScore(depth = 0) {
		let isGameComplete = this.isGameComplete();
		if(isGameComplete.complete) {
			if(this.players.maximizer === isGameComplete.winner) {
				// window.alert('won');
				return 10 - depth;
			} else if(this.players.minimizer === isGameComplete.winner) {
				// console.log(10-depth);
				// window.alert('loss');
				return 10 - depth;
			}
		} else {
			return 0;
		}
	}

	updateBoard(position) {
		this.boardSetup[position] = this.currentTurn;
	}

	makeNextMoveComputer() {
		let remainingSpots = this.getRemainingSpots();

		let allPossibleMoves = remainingSpots.map(move => {
			let newAction = new Action(move, this, this.currentTurn);
			newAction.score = AI.MinMax(newAction.currentState);
			return newAction;
		});
		let selectedMove;
		if(this.currentTurn === 'X') {
			selectedMove = allPossibleMoves.sort((a,b) => {
				return a.score > b.score;
			})[0];
		} else {
			selectedMove = allPossibleMoves.sort((a,b) => {
				return a.score < b.score;
			})[0];
		}
		this.updateBoard(selectedMove.positionToPlace, this.currentTurn);	
		
		return selectedMove.positionToPlace;
	}
}

class Action {
	constructor(position, state, currentTurn) {
		this.positionToPlace = position;
		this.currentState = new TicTacToe(JSON.parse(JSON.stringify(state.boardSetup)));
		this.currentState.boardSetup[position] = currentTurn;
	}
}

class AI {
	constructor() {
		this.game = new TicTacToe();
	}

	static MinMax(state, depth = 0) {
		depth++;
		let currentStateScore;
		if(state.isGameComplete().complete) {
			return state.finalScore(depth);
		}
		if(state.currentTurn === 'X') {
			currentStateScore = -10;
		} else {
			currentStateScore = 10;
		}
		let spots = state.getRemainingSpots();

		let allPossibleCases = spots.map(x => {
			let currentSetup = state;
			let currentPlayer = state.nextTurn();			
			let action = new Action(x, currentSetup, currentPlayer);
			return action;
		});

		allPossibleCases.forEach(ccase => {
			let nextCaseScore = this.MinMax(ccase.currentState, depth);
			if(ccase.currentState.currentTurn === 'X') {
				if(nextCaseScore > currentStateScore) {
					currentStateScore = nextCaseScore;
				}
			} else {
				if(nextCaseScore < currentStateScore) {
					currentStateScore = nextCaseScore;
				}
			}
		});

		return currentStateScore;
	}	
}


window.onload = function() {
	let ids = ['00','01','02','10','11','12','20','21','22'];
	let game = new TicTacToe();
	ids.forEach(id => {
		document.getElementById(id).onclick = function(){
			game.updateBoard(id);
			document.getElementById(id).innerHTML = game.currentTurn;
			setTimeout(() => {
				game.nextTurn();
				let finalPos = game.makeNextMoveComputer();
				document.getElementById(finalPos).innerHTML = game.currentTurn;
				game.nextTurn();
			});
		};
	});
};