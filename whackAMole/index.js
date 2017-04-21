(function(){
	'use strict';
  let SIZE_COL = 5;
  let SIZE_ROW = 5;
  
  function Game() {
  	this.moles = {};
    this.initialize();
  }
  
  Game.prototype.didPlayerWin = function() {
  	return !Object.keys(this.moles).some((entry) => {
    	return this.moles[entry];
    });
  };
  
  Game.prototype.initialize = function() {
  	let noOfMoles = parseInt((SIZE_COL * SIZE_ROW)/2);
		let counter = 0;
    
    while(counter !== noOfMoles) {
    	let i = Math.floor(Math.random() * SIZE_COL);
      let j = Math.floor(Math.random() * SIZE_ROW);
      let currentIndex = i + '_' + j;
      if(!this.moles[currentIndex]) {
      	this.moles[currentIndex] = true;
        counter++;
      }
    }
    this.createGrids();
  }
  
  Game.prototype.createGrids = function() {
  	$('#whack-mole').empty();
  	for(let i = 0; i<SIZE_COL; i++) {
    	$('#whack-mole').append('<div class="row"></div>')
    	for(let j = 0; j<SIZE_ROW; j++) {
      	let item = this.moles[i+'_'+j] ? `<div class="has-moles grid" data-index=${i+'_'+j}></div>` : `<div class="no-moles grid" data-index=${i+'_'+j}></div>`;
        $('#whack-mole .row').last().append(item);
      }
    }
    
    this.createhandlers();
  }
  
  Game.prototype.createhandlers = function() {
  	let that = this;
  	$('#whack-mole').on('click', '.grid', function() {
    	let index = $(this).data().index;
      if(that.moles[$(this).data().index]) {
      	that.moles[$(this).data().index] = false;
        $(this).removeClass('has-moles');
        $(this).addClass('no-moles');
      }
      if(that.didPlayerWin()) {
        alert('you win');
      	clearInterval(that.timer);
        delete that.timer;
      }

      if(!that.timer) {
      	that.timer = setInterval(() => {
        	new Game();
          clearInterval(that.timer);
      	}, 5000);
      }
      
     
    });
  }
  
  $(document).ready(() => new Game());
})();