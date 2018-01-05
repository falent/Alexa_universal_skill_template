"use strict";


const Alexa = require("alexa-sdk");

const SpeechOutput = require('./alexa/resources/speech-output');
const newSessionHandlers = require('./alexa/handlers/newSession.handlers');
const nameHandlers = require('./alexa/handlers/name.handlers');
const reserveRoomHandlers = require('./alexa/handlers/reserveRoom.handlers');

var allHandlers = [
	newSessionHandlers,
	nameHandlers,
	reserveRoomHandlers
];


const config = require("./alexa/config/settings");

//-------- ONLY IF YOU USE HTTPS SERVER --------  
if (config.server=="https"){
	
	const express = require("express");
	const context = require("aws-lambda-mock-context");
	
	const alexaRouter = express.Router();



	alexaRouter.post("/", (req, res) => {
	    const mockContext = context();
	    if (!req.body) {
	        res.sendStatus(400);
	        return;
	    }
	    else {
	        try {
	            alexaHandler(req.body, mockContext, (err, result) => {
	                if (err)
	                    res.status(500).json(err);
	                else
	                    res.status(200).json(result);
	            });
	        }
	        catch (err) {
	            res.sendStatus(500);
	            console.log("Error: ", err);
	        }
	    }
	});	
	
	const alexaHandler = function (event, context, callback) {
	    const alexa = Alexa.handler(event, context, callback); 
	    alexa.resources = SpeechOutput;
	    alexa.registerHandlers.apply(null, allHandlers);
	    alexa.execute();
	};




	exports.default = alexaRouter;

		
} 
//-------- ONLY IF YOU USE AWS SERVER -------- 
// if you use AWS remember that you copy node_modules to src directory! and you only zip files from src directory!!
else {
	exports.handler = function(event, context, callback) {
	    const alexa = Alexa.handler(event, context, callback); 
	    alexa.resources = SpeechOutput;
	    alexa.registerHandlers.apply(null, allHandlers);
	    alexa.execute();
	};
	
}






