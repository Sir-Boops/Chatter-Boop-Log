// Node-JS Imports
var tmi = require('tmi.js');

// Global functions
var client = new tmi.client();

var create_client = function(user, pass, channel, logger) {

	// Set client options
	var options = {
		options: {
			debug: false
		},
		connection: {
			reconnect: true,
			secure: true
		},
		identity: {
			username: user,
			password: pass
		},
		channels: [channel]
	};

	// Create the client
	client = new tmi.client(options);

	// Connect
	client.connect();

	logger.log('[Twitch] : Client connected to Twitch.tv');
};

var listen_chat = function(logger, api, plugins) {

	// Listen to chat log and dump to the API
	client.on('chat', function(channel, user, message, self) {

		// Log the chat message to console
		logger.log("[Twitch][" + user.username + "] : " + message);
	});
};

// Exports
module.exports.create = create_client;
module.exports.chat = listen_chat;
