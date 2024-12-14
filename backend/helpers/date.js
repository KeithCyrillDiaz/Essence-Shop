const logger = require("../utils/logger");

const monthToInt = {
    'January': 1,
    'February': 2,
    'March': 3,
    'April': 4,
    'May': 5,
    'June': 6,
    'July': 7,
    'August': 8,
    'September': 9,
    'October': 10,
    'November': 11,
    'December': 12
}


function getWeekOfMonth(monthString, day, year) {

    //validate to prevent error
    if(typeof(monthString) !== 'string' || typeof(day) !== 'number' || typeof(year) !== 'number'){
        logger.Error("Parameters Must Be Numbers");
        return;
    }  

    const month = monthToInt[monthString];

    console.log("month: ",month)

    // Get the first date of the month (1st day of the month)
    const startDate = new Date(year, month - 1, 1);

    // Get the last date of the month
    const endDate = new Date(year, month, 0); // 0th day of next month gives the last day of the current month
    
    const weeks = [];

    //calculate the start and end dates of each week within the month
    let currentWeekStartDate = startDate;
    let index = 0
    while (currentWeekStartDate <= endDate) {
        const weekEndDate = new Date(currentWeekStartDate);
        weekEndDate.setDate(currentWeekStartDate.getDate() + 7); // Get the Sunday of the current week

        // Ensure the week doesn't go beyond the last date of the month
        if (weekEndDate > endDate) {
            weekEndDate.setDate(endDate.getDate());
        }

        //check if day value is wihtin the current week value
        const start = currentWeekStartDate.getDate();
        const end = weekEndDate.getDate() 

        console.log(`Start: ${start}`);
        console.log(`End: ${end}`);


        if(day >= start && day <= end) {
            //cut the function if the conditions met and return the index + 1 since index starts at 0
            return index + 1;
         }

        // Move to the next week
        currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
        //increment index for next loop
        index++;
    }
}

module.exports = {
    getWeekOfMonth
}