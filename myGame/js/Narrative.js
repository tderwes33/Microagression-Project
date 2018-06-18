//Narrative.js
//Stores the content of each character's main dialouge trees

var Narrative = (function() {
	
	function loadJSON(callback){
		console.log("In loadJSON");
		console.log("callback: " + callback);
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open("GET", "dialougeTrees.json", true);
		xobj.onreadystatechange = function(){
			if(xobj.readyState == 4 && xobj.status == "200"){
				var data = xobj.responseText;
				console.log(data);
				var actual_JSON = JSON.parse(data);
				console.log(actual_JSON["aggressionOccurred"]);
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	};

	function init() {
		loadJSON(function(response){
			var actual_JSON = JSON.parse(response);
			console.log("response: " +response);
		});
	};

	function getAIDialogue(){
		//console.log(aiContent["aggressionOccurred"])
		console.log("Reference to narrative");
		var aiContent = JSON.parse(dialougeTrees);
	};
	
	function DialogueManager(game, action){
		this.action = action;
		this.dialogueObjects = [];
		this.states = ["hasSomethingToSay", "speaking", "finsihedSpeaking", "noMoreToSay"];
		this.currentState = this.states[0];

		this.currentUtterance = game.add.text(100, 500, action.name, { font : "32px Arial", fill: "#ffffff", backgroundColor: "rgba(0,0,0)"});
		this.currentUtterance.maxWidth = 300;
		this.currentUtterance.visible = false;
		this.currentDialougeID = null;

	};

/*	DialogueManager.protoype.acceptDialougeObject = function(obj){
		this.dialogueObjects.push(obj);
	};*/

	/*DialogueManager.prototype.promptPressed = function(){
	if(this.targetsColliding.length > 0){
		//console.log(this);
		// If we are on state 0, go to state 1
		if(this.currentState == this.states[0]){
			this.currentState = this.states[1];
			//console.log("promptPressed, moved states 0 to 1", this.parent.id, this.currentState);
		} else if(this.currentState == this.states[1]){
			// If we are on state 1, go to state 2
			// NOTE: To be in state 1, we must have set this.currentDialogueID in showText()
			// we need this.currentDialogueID to set it read when we press this button
			//console.log("this.currentDialogueID should have been set", this.currentDialogueID);
			this.dialogueObjects[this.currentDialogueID].spoken = true;
			this.currentState = this.states[2]
			//console.log("promptPressed, moved states 1 to 2", this.parent.id, this.currentState);
		} 
	}
	
};

DialogueManager.prototype.showText = function(dialogueObjectID, utterance){
	//console.log("showText is setting dialogueObjectID", dialogueObjectID);
	this.currentDialogueID = dialogueObjectID;
	this.currentUtterance.visible = true;
	this.currentUtterance.text = utterance;
	this.positionSprites(true);
};

DialogueManager.prototype.hideText = function(){
	this.currentUtterance.visible = false;
};*/


	return {
		loadJSON : loadJSON,
		init : init,
		getAIDialogue : getAIDialogue
		//DialogueManager : DialogueManager

	}
})();
