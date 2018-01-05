// newSession.handlers.js

const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');


const inNewSessionStartableIntents = [
    'SharePriceIntent'
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
    	
        this.response.speak(SpeechOutputUtils.pickRandom(this.t('WELCOME')))
            .listen(SpeechOutputUtils.pickRandom(this.t('REPEAT')));
        this.emit(':responseReady');

        
    },
    // Custom Intents:
    'NameIntent': function() {
        this.handler.state = States.NAME;
        this.emitWithState('NameIntent');
    },
    'SharePriceIntent': function() {
        this.handler.state = States.SHARE_PRICE;
        this.emitWithState('SharePriceIntent');
    },
    
    // Built-In Intents:

    'AMAZON.HelpIntent': function () {
        this.response.speak(SpeechOutputUtils.pickRandom(this.t('HELP')).listen(this.t('REPEAT')));
        this.emit(':responseReady');

    },

    'AMAZON.StopIntent': function () {
    	this.response.speak(SpeechOutputUtils.pickRandom(this.t('STOP_ANSWER')));
        this.emit(':responseReady');

    },

    'AMAZON.CancelIntent': function () {
    	this.response.speak(SpeechOutputUtils.pickRandom(this.t('CANCEL_ANSWER')));
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak(SpeechOutputUtils.pickRandom(this.t('UNDEFINED')).listen(this.t('REPEAT')));
        this.emit(':responseReady');

    }
};
