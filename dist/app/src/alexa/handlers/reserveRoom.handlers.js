
const Alexa = require('alexa-sdk');
const States = require('./states.const');
const SpeechOutputUtils = require('../utils/speech-output.utils');

//we will ask API for that during our event :)

module.exports = Alexa.CreateStateHandler(States.RESERVE_ROOM, {


	'ReserveRoomIntent': function() {
		var roomName = this.event.request.intent.slots.room_name.value;
		var roomNumber = this.event.request.intent.slots.number.value;
		
        this.response.speak(SpeechOutputUtils.pickRandom(this.t('RESERVE_ROOM', roomName, roomNumber))+" "+this.t('RESERVE_ROOM_QUESTION'))
        .listen(SpeechOutputUtils.pickRandom(this.t('RESERVE_ROOM_QUESTION')));
        this.emit(':responseReady');
		

	},
	'TemperatureRoomIntent': function() {
		
		this.handler.state = States.NONE;
		var temperature = 10;
	    this.respone.speak(this.t('TEMPERATURE_ROOM', temperature ));
	    this.emit(':responseReady');
	},
    // Unhandled Intent:

    'Unhandled': function () {
        this.handler.state = States.NONE;
        this.emit('Unhandled'); // emit in newSession handlers
    },
	
    'AMAZON.YesIntent': function() {
		this.handler.state = States.NONE;
		var temperature = 10;
        this.response.speak(SpeechOutputUtils.pickRandom(this.t('TEMPERATURE_ROOM', temperature))+" bye bye! ")

	    this.emit(':responseReady');
    	//this.emit('TemperatureRoomIntent');
    }
		
	

});
