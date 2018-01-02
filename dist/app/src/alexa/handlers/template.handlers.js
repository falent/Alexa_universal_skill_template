
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var User = require('../models/user');

//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://heroku_06rbcqqq:cud4kb4h1c6733ql6jrnlakv06@ds231315.mlab.com:31315/heroku_06rbcqqq";

module.exports = Alexa.CreateStateHandler(States.TEMPLATE, {

    'NameIntent': function() {
        var myName = this.event.request.intent.slots.firstname.value;
        var userID = this.event.session.user.userId;
        console.log(userID);
        
       
        User.findOneAndUpdate(
        		{userId:  userID}, 
        		{$set:{name:myName}},  
        		{upsert: true, new: true, runValidators: true}, 
        		function(err, doc){
        			if(err){
        				console.log("Something wrong when updating data!");
        			}

        			console.log(doc);
        		});
        
//        MongoClient.connect(url, function(err, db) {
//        	  if (err) throw err;
//        	  db.collection("myUsers").update(
//        			  { alexaUserID: userID }, 
//        			  {$set:{userName: name}},
//        			  {'upsert':true},
//        	  function(err, res) {
//        	    if (err) throw err;
//        	    console.log("1 document updated");
//        	    db.close();
//        	  });
//        	});        
           
        this.emit(':tell', SpeechOutputUtils.pickRandom(this.t('TEMPLATE_ANSWER', myName)));
    },
    // Unhandled Intent:

    'Unhandled': function () {
        this.handler.state = States.NONE;
        this.emit('Unhandled'); // emit in newSession handlers
    },

    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.handler.state = States.NONE;
        this.emit(':ask', SpeechOutputUtils.pickRandom(this.t('HELP')));
    },

    'AMAZON.NoIntent': function() {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    },

    'AMAZON.StopIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.StopIntent');
    },

    'AMAZON.CancelIntent': function () {
        this.handler.state = States.NONE;
        this.emit('AMAZON.CancelIntent');
    }

});
