"use strict";

const express = require("express");
const Alexa = require("alexa-sdk");
const context = require("aws-lambda-mock-context");

const SpeechOutput = require('./alexa/resources/speech-output');
const newSessionHandlers = require('./alexa/handlers/newSession.handlers');
const templateHandlers = require('./alexa/handlers/template.handlers');

const config = require("./alexa/config/settings");

//-------- ONLY IF YOU USE HTTPS SERVER --------  
if (config.server=="http"){
	
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
	    alexa.registerHandlers(
	      newSessionHandlers,
	      templateHandlers
	    );
	    alexa.execute();
	};




	exports.default = alexaRouter;

		
} 
//-------- ONLY IF YOU USE AWS SERVER --------  
else {
	exports.handler = function(event, context, callback) {
	    const alexa = Alexa.handler(event, context, callback); 
	    alexa.resources = SpeechOutput;
	    alexa.registerHandlers(
	      newSessionHandlers,
	      templateHandlers
	    );
	    alexa.execute();
	};
	
}






