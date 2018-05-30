
// Initialize Firebase
var config = {
	apiKey: "AIzaSyC87ZDv3PLxWmo3MbKGKpNI77lxK0I6nQU",
	authDomain: "rps-multipeople.firebaseapp.com",
	databaseURL: "https://rps-multipeople.firebaseio.com",
	projectId: "rps-multipeople",
	storageBucket: "rps-multipeople.appspot.com",
	messagingSenderId: "286808755970"
};
firebase.initializeApp(config);
var fire = firebase.database();
var data;

var playObj = {
	player1: {
		name: 1,
		play: 1
	},
	player2: {
		name: 1,
		play: 1
	},
	plays: {
		myPlay: 1,
		opponentPlay: 1
	},
	wins: {
		myWins: 0,
		opponentsWins: 0,
		ties: 0
	},
	opponenetName: null
}
function start() {
	fire.ref().set({
		player1: {
			name: 1,
			play: 1
		},
		player2: {
			name: 1,
			play: 1
		}
	}); //end this set.
}

function giveName() {
	$('.row-start').slideUp(2000);
	console.log('initial value of firebsae name1 is ' + data.player1.name);

	if ((data.player1.name === 1) && ($('#name-input').val() !== '')) {
		playObj.player1.name = $('#name-input').val();
		console.log('name input in player1.name block is ' + $('#name-input').val());
		console.log('local name 1 is ' + playObj.player1.name);
		fire.ref().update({
			player1: {
				name: playObj.player1.name,
				play: 1
			}
		}); // end firebase set data.player1.name
		playObj.player1.name = data.player1.name;
		$('#name-input').val('');
		$('.row-message').show();
		$('.col-message').html("<span>Waiting for an opponent...</span>");
		console.log('firebase player1.name ' + data.player1.name);
		player2OpponenetSet();
	} else if (($('#name-input').val() !== '') && (data.player1.name != playObj.player1.name) && (data.player2.name === 1)) {
		playObj.player2.name = $('#name-input').val();
		console.log('name input in name2 block is ' + $('#name-input').val());
		console.log('local player2.name is ' + playObj.player2.name);
		fire.ref().update({
			player2: {
				name: playObj.player2.name,
				play: 1
			}
		}); // end firebase set name2
		playObj.player2.name = data.player2.name;
		$('#name-input').val('');
		console.log('firebase name 2 is ' + data.player2.name);
		playersTogether();
	} // set player1 and player2
} // end of giveName

function player2OpponentSet() {
	if ((data.player2.name !== playObj.player2.name) && (data.player1.name === playObj.player1.name) && (data.player2.name !== 1)) {
		playObj.player2.name = data.player2.name;
		playObj.opponentName = data.player2.name;
		console.log('local opponent name (2) is ' + playObj.opponentName);
		playersTogether();
	} else {
		setTimeout(player2OpponentSet, 500);
	}
} // player2OpponentSet

function playersTogether() {
	if (playObj.opponentName !== null) {
		console.log('onpponent is ' + playobj.opponentName);
		$('.row-message').show();
		$('.col-message').html("<span>You're playing with " + playObj.opponentName + " today. Click rock, paper or scissors to play a round. Have fun Mmkay</span>");
		setTimeout(startPlay, 2000);
	} // show begin message.
} // end playersTogether.

function startPlay() {
	$('.row-message').slideUp();
	$('.row-play-choice').slideDown();
}// end startPlay

function nameFocus() {
	$('#name-input').focus(function () {
		if ((($('#name-input').attr('value')) || ($('#name-input').val())) == 'Name') {
			$('#name-input').attr('value', '');
			$('#name-input').val('');
			console.log('onfocus ' + $('#name-input').attr('value'), $('#name-input').val());
		} //name-input blur if
	}); // name-input blur if
} // end nameFocus

function makeMove(event) {
	playObj.play.myPlay = $(event.target).data('move');
	console.log('myPlay is ' + playobj.plays.myPlay);
	$('.row-play-choice').hide();
	$('.row-play-battle').show();
	$('.pic-my-play').html('<img class="battle-img" src="img/' + playObj.plays.myPlay + '.jpg" alt="You played ' + playObj.plays.myPlay + '" />');
	$('.my-move-caption').html('<span>' + playObj.plays.myPlay + '</span>');
	if ((playObj.opponentName === data.player2.name) && (data.player1.play === 1)) {
		console.log('player 1 set play value in firebase');
		playObj.player1.play = playObj.plays.myPlay;
		fire.ref().update({
			payer1: {
				name: data.player1.name,
				play: playObj.player1.play
			}
		}); //end firebase update data.player1.play
		console.log('set player1 play complete. playObj.plays.myPlay for player 1 is "' + playObj.plays.myPlay + '" and data.player1.play is "' + data.player1.play + '"');
		setLocalOpponent1Play();
	} else if ((playObj.oponentName === data.player1.name) && (data.player2.play === 1)) {
		console.log('player2 set play value in firebase');
		playObj.player2.play = playObj.plays.myPlay;
		fire.ref().update({
			player2: {
				name: data.player2.name,
				play: playObj.player2.play
			}
		}); // end firebase update data.player2.play
		console.log('set player2 play complete. playObj.plays.myPlay for player2 is "' + playObj.plays.myPlay + '" and data.player2.play is "' + data.player2.play + '"');
		setLocalOpponent1Play();
	} else if ((playObj.opponentName === data.player1.name) && (data.player2.play === 1)) {
		playObj.player2.play = playObj.plays.myPlay;
		fire.ref().update({
			player2: {
				name: data.player2.name,
				play: playObj.player2.play
			}
		}); // end firebase update data.player2.play
		console.log('set player2 play complete. playObj.plays.myPlay for player2 is "' + playObj.plays.myPlay + '" and data.player2.play is "' + data.player2.play + '"');
		setLocalOpponent2Play();
	} // end set play db values
} // end makeMove
function setLocalOpponent2Play() {
	if (data.player2.play !== 1) {
		console.log('player1 set opponent play value locally');
		playObj.player2.play = data.player2.play;
		playObj.plays.opponentPlay = playObj.player2.play;
		$('.pic-opponent-play').html('<img class="battle-img" src="img/' + playObj.plays.opponentPlay + '.jpg" alt="Your opponent played ' + playObj.plays.opponentPlay + '" />');
		setTimeout(reckoning, 3000);
	} else {
		setTimeout(setLocalOpponent1Play, 500);
	}
}//end set local opponent 1 play
function setLocalOpponent2Play() {
	if (data.player1.play !== 1) {
		console.log('player2 set opponent play value locally');
		playObj.player1.play = data.player1.play;
		playObj.plays.opponentPlay = playObj.player1.play;
		$('.pic-opponent-play').html('<span>' + playObj.plays.opponentPlay + '</span');
		setTimeout(setLocalOpponent2Play, 500);
	}// end else if set opponent values
}// end set local opponent values
















function reckoning() {
	console.log('reckoning fired');
	$('.row-play-battle').hide();
	$('.row-reckoning').show();
	if (playObj.plays.opponentPlay === playObj.plays.myPlay) {
		$('.winning-pic').html('<img class="battle-img" src="img/' + playObj.plays.myPlay + '.jpg" alt="You tie!" />');
		$('.outcome-message').html('<span>you tie!</span>');
		playObj.wins.ties++;
		$('.col-win.').find('span').text('wins: ' + playObj.wins.myWins);
		$('.col-tie').find('spa').text('ties: ' + playObj.wins.ties);
		$('.col-lose').find('span').text('losses: ' + playObj.wins.opponentsWins);
	} else if ((playObj.playsmyPlay == 'rock' && playObj.plays.opponentPlay == 'scissors') || (playObj.plays.myPlay == 'scissors' && playObj.plays.opponentPlay == 'paper') || (playObj.plays.myPlay == 'paper' && playObj.plays.opponentPlay == 'rock')) {
		$('.winning-pic').html('<img class="battle-img" src="img/' + playObj.plays.opponentPlay + '.jpg" alt="You win!" />');
		playObj.wins.myWins++;
		$('.col-win').find('span').text('wins: ' + playObj.wins.myWins);
		$('.col-tie').find('span').text('ties: ' + playObj.wins.ties);
		$('.col-lose').find('span').text('losses: ' + playObj.wins.opponentWins);
		console.log('myWins is ' + playObj.wins.myWins);
	} // end reckoning game logic
	setTimeout(setNext, 3000);
} // end reckoning.
function setNext() { 

	fire.ref().update({
		player1: { 
			name: data.player1.name,
			play: 1
		},
		player2: {
			name: data.player2.name,
			play: 1
		}
	});
	$('.row-reckoning').hide();
	$('.pic-opponent-play, .oppenent-move-caption, .pic-my-play, .winning-pic, .outcome-message').empty();
	$('.row-pay-choice').show();
}





$(document).ready(function(){
	fire.ref().on('value', function(snapshot) {
		data = snapshot.val();
	});
	start();
	nameFocus();
	$('#name-submit').click(giveName);
	$(document).keypress(function(event) {
		if(event.which === 13) {
			giveName();
		}
});
$('.col-play-pic').click(function(event){
	makeMove(event)
});
}); //end doc. 

  // player 1 inputs name /
  // waiting for player 2
  // player 2 inputs name
  // firebase save names
  // alert player 2 name to player 1 firebase call names
  // alert player 1 name to player 2 firebase call names
  // ready, go!
  // provide three picture choices to click and a 5 second timer
  // on player click, fill half split battle screen with that player's choice push choice to firebase under player's name
  // on both clicks, populate both halves with images pull opponent from firebase
  // on both clicks, animate winning picture covering losing picture increment and push win/lose/tie counter to firebase
  // on timeout by one player, alert other player that they've won by timeout push win to firebase
  // alert win/lose/tie to each player pull from firebase
  // display as wins losses and ties at the top of the screen
  // repeat from ready, go!
  // on end game button, alert player that game end, push end game to firebase, alert other player that name has ended the game and reset both to name $('#name-input').val() screen
  // .child.set()



