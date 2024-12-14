const { getWeekOfMonth } = require('../../helpers/date');
const {
  MonthlyUserCount,
  updateDailyUserCount,
  updateWeeklyUserCount
} = require('../../models/counter/userCountModel');
const logger = require('../../utils/logger');

const updateUserCount = async (req, res, next) => {
    try {

        logger.Event("Update User Count Started");

        const {month, year, day, value} = req.body;

        if(!month || !year || !day || !value) {
            return res.status(400).json({
                code: 'UUC_001',
                message: "Invalid Fields"
            })
        }
        //get the week
        const week = getWeekOfMonth(month, day, year);

        const checkCountDocument = await MonthlyUserCount.findOne(
          {month, year}
        )

        if(!checkCountDocument) {
          logger.Event("No matching document found, creating a new entry");

          const newCount = new MonthlyUserCount({
            month,
            year,
            dailyUserCounts: [
              {
                day,
                userCount: value
              }
            ],

            weeklyUserCounts: [
              {
                week,
                userCount: value
              }
            ]
          })

          const result = await newCount.save();

          if(!result) {
            return res.status(500).json({
              code: 'UUC_002',
              message: `Internal Server Error`
            })
          }

          return res.status(200).json({
            code: 'UUC_000',
            message: `Created ${monthToString[month - 1]} ${year} user counter document`,
            data: result
          })
        }


        //update the daily count
        let dailyResult = await updateDailyUserCount(
           month, year, day, value
        )
      
          // Check if a document was updated
          if (!dailyResult) {
            //push the new data if day is not existing in dailyUserCounts
            logger.Event("No matching day found, adding a new entry");
          dailyResult = await MonthlyUserCount.findOneAndUpdate(
              { month, year }, // Match the specific month and year
              {
                $push: {
                  dailyUserCounts: { day, userCount: value },
                },
              },
              {new: true}
            );
          }


          //update the weekly count
          let weeklyResult = await updateWeeklyUserCount(
            month, year, week, value
          );

           // Check if a document was updated
           if (!weeklyResult) {
            //push the new data if day is not existing in dailyUserCounts
            logger.Event("No matching day found, adding a new entry");
            weeklyResult = await MonthlyUserCount.findOneAndUpdate(
              { month, year }, // Match the specific month and year
              {
                $push: {
                  weeklyUserCounts: { week, userCount: value },
                },
              },
            );
          }

          logger.Success("Daily user count updated successfully.");

          return res.status(200).json({
            code: 'UUC_000',
            message: "Daily user count updated successfully.",
            data: weeklyResult
          })

    } catch (error) {
        next(error);
    }
}

const getUserCountData = async (req, res, next) => {
  try {
      logger.Event("Get User Count Data Started");

      const {startYear} = req.body;

      if(typeof(startYear) !== 'number') {
        return res.status(400).json({
          code: 'GUCD_001',
          message: "Start Year Field must be a number"
        })
      }

      const yearToday = new Date().getFullYear();

      const result = await MonthlyUserCount.find(
        { year: { $gte: startYear, $lte: 2024 }}
      )

      if(result.length === 0) {
        return res.status(404).json({
          code: 'GUCD_002',
          message: `User Count for ${startYear} - ${yearToday} is not found`
        })
      }

      logger.Success("User Count Data Fetched Successfully");

      return res.status(200).json({
        code: 'GUCD_000',
        message: "User Count Data Fetched Successfully",
        data: result
      })

  } catch (error) {
    next(error)
  }
}


module.exports = {
   updateUserCount,
   getUserCountData
}