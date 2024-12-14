

const logger = {
    "Event": (message) => console.log("Event - ".magenta + message + "..."),
    "Error": (message, errorDetails) => {
        console.log("Error - ".red + message);
        if (errorDetails) {
            // Log error details (e.g., message, stack, statusCode)
            console.log("Details: ".red + JSON.stringify(errorDetails, null, 2));
        }
    },
    "Ready": (message) => console.log("Ready - ".green + message),
    "Success": (message) => console.log("Success - ".yellow + message),
};

module.exports = logger