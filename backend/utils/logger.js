

const logger = {
    "Event": (message) => console.log("Event - ".magenta + message + "..."),
    "Error": (message) => console.log("Error - ".red + message),
    "Ready": (message) => console.log("Ready - ".green + message),
    "Success": (message) => console.log("Success - ".yellow + message),
};

module.exports = logger