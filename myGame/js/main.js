var game;
var player;
var menuText;
var bool;
var content = ["This is test dialouge", 
				"This should progress like a normal conversation",
				"Chase wants to know some information"]
var line = [];
var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 360;
var lineDelay = 400;

var test = 0;

window.onload = function(){
	game = new Phaser.Game(800, 600, Phaser.AUTO);
	game.state.add('Load', Load);
	game.state.add('Play', Play);
	game.state.start('Load');
}

var Load = function(game) {};
Load.prototype = {
	preload: function() {

	},

	create: function(){
		var gameTitle = game.add.text(300, 200, 'Audacity', {fontSize: '44px', fill: '#ffffff'});

		var startButtonText = game.add.text(350, game.world.centerY, 'START', {fontSize: '24px', fill: '#ffffff'});
		startButtonText.inputEnabled = true;
		startButtonText.events.onInputDown.add(startTapped, this);


	},

	update: function(){
		
	}

};

function startTapped(item) {
	game.state.start('Play');
}



var Play = function(game) {};
Play.prototype = {

	preload: function(){
	   /*	test = Narrative.loadJSON(function(e){
			console.log("e:" +e);
			return e; 
	}); */
	game.load.json("dialogue", "../../dialougeTrees.json");
	game.load.json("mcDialogue", "../../mcDialogue.json");

	},

	create: function(){
		var spaceKey;
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.nextText = 0;

		var enterKey;
		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		this.mcOption1 = 0;
		this.mcOption2 = 0;
		this.mcOption3 = 0;


		game.stage.setBackgroundColor('#87CEEB');

		playerChoices = Ensembler.getThreeActions();
		//console.log(playerChoices);
		//console.log(playerChoices[0]);

		//Ensembler.doAction(playerChoices[0]);

		dialogue = this.game.cache.getJSON("dialogue");
		dialogue.toString();
		mcDialogue = this.game.cache.getJSON("mcDialogue");
		mcDialogue.toString();


		//console.log("Total options: " + JSON.stringify(dialouge));
		//console.log("dialouge: " + JSON.stringify(dialouge[playerChoices[0].name]));
		//this.parseDialogueJSON(playerChoices[0], dialouge);
		Ensembler.getCharacterState(playerChoices[0].goodBindings[0].responder);


		//text = game.add.text(32, 32, response, {font: "15pt Arial", fill: "#ffffff"});
		//nextLine();

	},
	update: function(){
		if(this.spaceKey.downDuration(5)){
			playerChoices = Ensembler.getThreeActions();
			this.parseMCDialogueJSON(playerChoices[0], playerChoices[1], playerChoices[2], mcDialogue);
			this.nextText = 0;
		}
		if(this.enterKey.downDuration(5)){
			this.parseDialogueJSON(playerChoices[0], dialogue);
			Ensembler.doAction(playerChoices[0]);
			game.world.remove(this.mcOption1);
			this.mcOption2 = 0;
			this.mcOption3 = 0;
		}

	},

	parseMCDialogueJSON: function(action1, action2, action3, jsonData){
			console.log("action1 is: " + action1.name);
		    action1Name = action1.name;
		    console.log("action1 people: " + action1.goodBindings[0].responder);
		    if(action1.goodBindings[0].responder!= null){
		    	recipient1 = action1.goodBindings[0].responder;
		    	var item1 = jsonData[action1Name];

		    	console.log("item1: "+ item1);

		    	choice1 = item1[recipient1];
		    	console.log("choice1: " + choice1);

		    } else {
		    	console.log("this is a solo action");
		    	choice1 = jsonData[action1Name];
		    }
		    
		    console.log("action2 is: " + action2.name);
		    action2Name = action2.name;
		    if(action2.goodBindings[0].responder!= null){
		    	console.log("action1 people: " + action2.goodBindings[0].responder);
		    	recipient2 = action2.goodBindings[0].responder;
		    	var item2 = jsonData[action2Name];

		    	console.log("item2: "+ item2);

		    	choice2 = item2[recipient2];
		    	console.log("choice2: " + choice2);
		    } else {
		    	console.log("this is a solo action");
		    	choice2 = jsonData[action2Name];
		    }
		    


		    console.log("action3 is: " + action3.name);
		    action3Name = action3.name;
		    if(action3.goodBindings[0].responder!= null){
		    	console.log("action3 people: " + action3.goodBindings[0].responder);
		    	recipient = action3.goodBindings[0].responder;
		    	var item3 = jsonData[action3Name];

		    	console.log("item3: "+ item3);

		    	choice3 = item3[recipient];
		    	console.log("choice3: " + choice3);
		    } else {
		    	console.log("this is a solo action");
		    	choice3 = jsonData[action3Name];
		    }
		    

		    printMCOptions(choice1, choice2, choice3);
	},

	parseDialogueJSON: function(action, jsonData){
		    // the item is the {} info in the json for the utterance key
		    console.log("action is: " + action.name);
		    actionName = action.name;
		    console.log("action people: " + action.goodBindings[0].responder);
		    if(action.goodBindings[0].responder!= null){
		    	responder = action.goodBindings[0].responder;
		    	var item = jsonData[actionName];
		    	 console.log("item: "+ item);

		    	response = item[responder];
		   	    console.log("response: " + response);
		        console.log("responder's mood: " + responder.mood);
		    
		    	printResponse(response);
		    } else{
		    	console.log("this is a solo action");
		    	return;
		    }
		    

		    //should produce 15 items since there are 15 unique actions in JSON atm.
		   

		    //var moodDialouge = responder.mood;
		    //if(response[])


		    //item.option = action;
		   // console.log("each iteration of actions: " + item.option);
		    //spits out Chase's response for each action
		   //console.log("Julia stuff when mood doesn't affect response:" + item.Julia); 
		    /*for(var mood in item.Julia){
		    	if(!item.Julia.hasOwnProperty(mood)){
		    		//eachAction[item.Chase].acceptDialougeObject(item);
		    		console.log("done looping for Julia");
		    	} else{
		    		var choice = item.Julia[mood];
		    		console.log("CHOICE for Julia: " + choice);
		    	  }
		    	
		    	}*/
		    
	}

}


function printResponse(dialogue){
	this.nextText = game.add.text(32, 32, dialogue, {font: "15pt Arial", fill: "#ffffff"});
}



function printMCOptions(dialogue1, dialogue2, dialogue3){
	this.mcOption1 = game.add.text(250, 200, dialogue1, {font: "15pt Arial", fill: "#ffffff"});
	this.mcOption2 = game.add.text(250, 350, dialogue2, {font: "15pt Arial", fill: "#ffffff"});
	this.mcOption3 = game.add.text(250, 500, dialogue3, {font: "15pt Arial", fill: "#ffffff"});
}





function nextLine(){
	if(lineIndex == content.length){
		return;
	}

	//splits the line on spaces, so one word per element 
	line = content[lineIndex].split(' ');
	wordIndex = 0;
	game.time.events.repeat(wordDelay, line.length, nextWord, this);
	lineIndex++;
}

function nextWord(){
	//add next word on to text string and then a space so we can separate the word array elements 
	text.text = text.text.concat(line[wordIndex] + " ");
	wordIndex++; 

	if(wordIndex == line.length){
		text.text = text.text.concat("\n");
		game.time.events.add(lineDelay, nextLine, this);
	}


}
