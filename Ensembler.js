

var Ensembler = (function() {
	//cast and actions are global due to how they're referenced

	var cast;
	var rawCast;
	var actions;
	var rawSchema;
	var schema;

	function init(){

		ensemble.init();
		var loadResult = ensemble.init();
		console.log(loadResult);

		//Locating Files in data
		var path = "data/";
		console.log(path+"schema.json");

		//Schema
		rawSchema = ensemble.loadFile(path+"schema.json");
		schema = ensemble.loadSocialStructure(rawSchema);
		console.log("schema", schema);

		//Cast
		rawCast = ensemble.loadFile(path+"cast.json");
		cast = ensemble.addCharacters(rawCast);
		rawCast = rawCast["cast"];
		console.log("cast", cast);

		//Rules
		var rawTriggerRules = ensemble.loadFile(path+"triggerRules.json");
		var triggerRules = ensemble.addRules(rawTriggerRules);
		console.log("triggerRules", triggerRules);

		var rawVolitionRules = ensemble.loadFile(path+"volitionRules.json");
		var volitionRules = ensemble.addRules(rawVolitionRules);
		console.log("volitionRules", volitionRules);

		//Actions
		var rawActions = ensemble.loadFile(path+"actions.json");
	    actions = ensemble.addActions(rawActions);
		console.log("actions", actions);

		var rawHistory = ensemble.loadFile(path+"history.json");
		var history = ensemble.addHistory(rawHistory);
		console.log("history", history);
	}	

	function doAction(action){
		var effects = action.effects;

		console.log("action effects:", effects);
		// Physically changing social state through coded actions

		for(var i in effects){
			ensemble.set(effects[i]);
			console.log("effects[i]:", effects[i]);
		}

		//Run trigger rules on the cast now that the effects have taken place
		ensemble.runTriggerRules(cast);

		//Built in function to advance time step
		ensemble.setupNextTimeStep();
	}

	function getCharacterState(character){
		var totalMood = schema["mood"];
		/*var person = cast["0"];
		var secondPerson = cast[1];
		console.log("person is : " + person);
		console.log("2nd person is : " + secondPerson);*/
		
		console.log("totalMoods are: " + totalMood);
		console.log("character name: " + character);
		
		for(mood in totalMood){
			console.log("mood = " + mood);
			var currentMood = ensemble.getCharData(character, mood);
			console.log("current Mood is: " + currentMood);
			//console.log("current Mood is: " + currentMood);
		}
		/*
		console.log("character name: " + character);
		var currentMood = ensemble.getCharData(character, totalMood);
		console.log("currentMood: " + currentMood);*/
	} 

	//function toneChoice(){
		// If the player is experiencing a particularly extreme emotion,
		// the player's font choices for their dialouge options can change
		// However, normal font, aka neutral tone is always avaiable. 

	//}

	//function travelLocations(){
		// Allows the player to quickly move between certain game areas
		// like the classroom, their home, or the campus
		// by manipulating Ensemble's location schema

	//}

	function getThreeActions(){

		//Sort the actions into an order from least to greatest
		//Then just pick the top three = more efficient? 

		var volitions = ensemble.calculateVolition(cast);

		var firstAction = ensemble.getAction(cast[0], cast[0], volitions, cast);
		var secondAction = ensemble.getAction(cast[0], cast[0], volitions, cast);
		var thirdAction = ensemble.getAction(cast[0], cast[0], volitions, cast);
		var initiator = cast[0];
		console.log("test: " + initiator);

			for(var responder in cast){

				if(volitions.getFirst(initiator, cast[responder]) != undefined ){

					var action = ensemble.getAction(initiator, cast[responder], volitions, cast);

					if(action != undefined){
						console.log("Action (weight ", action.weight, ") :", action);

						if(action.weight > firstAction.weight ){
							firstAction = action;
						}
					}
				}
			}

	
			for(responder in cast){

				if(volitions.getFirst(initiator, cast[responder]) != undefined ){

					action = ensemble.getAction(initiator, cast[responder], volitions, cast);

					if(action != undefined){
						console.log("Action (weight ", action.weight, ") :", action);

						if(action.weight > secondAction.weight && secondAction.weight< firstAction.weight && secondAction != firstAction){
							secondAction = action;
						}
					}
				}
			}
		

		
			for(responder in cast){

				if(volitions.getFirst(initiator, cast[responder]) != undefined ){

					action = ensemble.getAction(initiator, cast[responder], volitions, cast);

					if(action != undefined){
						console.log("Action (weight ", action.weight, ") :", action);

						if(action.weight > thirdAction.weight && thirdAction.weight < secondAction.weight && thirdAction != secondAction){
							thirdAction = action;
						}
					}
				}
			}
		

		console.log("firstAction:", firstAction);
		console.log("secondAction:", secondAction);
		console.log("thirdAction:", thirdAction);

		return [firstAction, secondAction, thirdAction];

	}



	return{
		init: init,
		doAction : doAction,
		getCharacterState : getCharacterState,
		//toneChoice : toneChoice,
		//travelLocations : travelLocations,
		getThreeActions : getThreeActions

	}


})();
