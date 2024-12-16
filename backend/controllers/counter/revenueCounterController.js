const { getWeekOfMonth } = require('../../helpers/date');
const {
    MonthlyRevenueCount,
    updateWeeklyRevenueCount,
    updateDailyRevenueCount
} = require('../../models/counter/revenueCountModel');
const logger = require('../../utils/logger');

const updateRevenue = async (res, month, year, day, week, value) => {
  console.log(`month: ${month}, year: ${year}, day: ${day}, week: ${week}, value: ${value}`);
  if(!month || !year || !day || !week || !value){
   
    logger.Error("INvalid Parameters")
    return 
  }
  const checkDocument = await MonthlyRevenueCount.findOne({month, year});
        if(!checkDocument) {
            logger.Event("No matching document found, creating a new entry");

            const newCount = new MonthlyRevenueCount({
              month,
              year,
              dailyRevenueCounts: [
                {
                  day,
                  revenueCount: value
                }
              ],
  
              weeklyRevenueCounts: [
                {
                  week,
                  revenueCount: value
                }
              ]
            });

            const result = await newCount.save();

            if(!result) {
              return res.status(500).json({
                code: 'URC_002',
                message: `Internal Server Error`
              })
            }
  
            // return res.status(200).json({
            //   code: 'URC_000',
            //   message: `Created ${month} ${year} revenue counter document`,
            //   data: result
            // })

            return {
              weeklyResult: result
            }
        }

         let dailyResult = await updateDailyRevenueCount(
            month, year, day, value
         )
       
           // Check if a document was updated
           if (!dailyResult) {
             //push the new data if day is not existing in dailyUserCounts
             logger.Event("No matching day found, adding a new entry");
           dailyResult = await MonthlyRevenueCount.findOneAndUpdate(
               { month, year }, // Match the specific month and year
               {
                 $push: {
                   dailyRevenueCounts: { day, revenueCount: value },
                 },
               },
               {new: true}
             );
           }

            //update the weekly count
          let weeklyResult = await updateWeeklyRevenueCount(
            month, year, week, value
          );

           // Check if a document was updated
           if (!weeklyResult) {
            //push the new data if day is not existing in dailyUserCounts
            logger.Event("No matching day found, adding a new entry");
            weeklyResult = await MonthlyRevenueCount.findOneAndUpdate(
              { month, year }, // Match the specific month and year
              {
                $push: {
                  weeklyRevenueCounts: { week, revenueCount: value },
                },
              },
            );
          }

          return {
            weeklyResult,
          }

}


const updateRevenueCount = async (req, res, next) => {
    try {

        logger.Event("Update Revenue Count Started");

        const {month, year, day, value} = req.body;

        if(!month || !year || !day || !value ||typeof(month) !== 'string') {
            return res.status(400).json({
                code: 'URC_001',
                message: "Invalid Fields"
            })
        }

        
         //get the week
        const week = getWeekOfMonth(month, day, year);
        const {weeklyResult} = await updateRevenue(res, month, year, week, day, value);        

          logger.Success("Daily revenue count updated successfully.");

          return res.status(200).json({
            code: 'URC_000',
            message: "Daily revenue count updated successfully.",
            data: weeklyResult
          })



    } catch (error) {
        next(error);
    }
}

const getRevenueCount = async (req, res, next) => {
    try {
        logger.Event("Get Revenue Count Data Started");

        const {startYear} = req.body;
  
        if(typeof(startYear) !== 'number') {
          return res.status(400).json({
            code: 'GRCD_001',
            message: "Start Year Field must be a number"
          })
        }
        const yearToday = new Date().getFullYear();

        const result = await MonthlyRevenueCount.find(
          { year: { $gte: startYear, $lte: 2024 }}
        )
  
        if(result.length === 0) {
          return res.status(404).json({
            code: 'GRCD_002',
            message: `Revenue Count for ${startYear} - ${yearToday} is not found`
          })
        }
  
        logger.Success("Revenue Count Data Fetched Successfully");
  
        return res.status(200).json({
          code: 'GRCD_000',
          message: "Revenue Count Data Fetched Successfully",
          data: result
        })
  
    } catch (error) {
        next(error);
    }
}



module.exports = {
    updateRevenueCount,
    getRevenueCount,
    updateRevenueHelper: updateRevenue,
}