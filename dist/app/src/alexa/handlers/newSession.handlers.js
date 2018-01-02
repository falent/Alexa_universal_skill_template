// newSession.handlers.js

const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');
var User = require('../models/user');

const inNewSessionStartableIntents = [
    'TemplateIntent'
];

module.exports = {

    'NewSession': function() {
        // Intent Request:
        if (this.event.request.type === 'IntentRequest') {
            const intentName = this.event.request.intent.name;
            if (inNewSessionStartableIntents.indexOf(intentName) > -1) {
                return this.emit(intentName);
            }
        }
        // else: Launch Request
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        var userID = this.event.session.user.userId;
        console.log(userID);
        var self = this;
        
        User.findOne({ userId: userID }, function(err, user) {
        	  if (err ||!user){
          	    self.emit(':ask',
          	    		SpeechOutputUtils.pickRandom(self.t('WELCOME')));
        	  }
        	  else {
             	 console.log(user);
     			 self.emit(':ask',
    		                SpeechOutputUtils.pickRandom(self.t('WELCOME_OK', user.name))
    	            );       
        	  }
  
        	});
        
    },
    // Custom Intents:
    'NameIntent': function() {
        console.log('[NewSessionHandlers] Template');
        this.handler.state = States.TEMPLATE;
        this.emitWithState('NameIntent');
    },
    'Unhandled': function () {
      this.emit(':ask',
          SpeechOutputUtils.pickRandom(this.t('UNDEFINED'))
      );
    },

    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', SpeechOutputUtils.pickRandom(this.t('HELP')));
    },

    'AMAZON.StopIntent': function () {
        this.emit(':tell', SpeechOutputUtils.pickRandom(this.t('STOP_ANSWER')));
    },

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', SpeechOutputUtils.pickRandom(this.t('CANCEL_ANSWER')));
    }
};
