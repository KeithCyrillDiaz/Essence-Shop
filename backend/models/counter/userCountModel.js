const mongoose = require('mongoose');

const dailyUserCountSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  userCount: { type: Number, required: true }
});

const weeklyUserCountSchema = new mongoose.Schema({
  week: { type: Number, required: true },  // Week number within the month (1-4, 5 for some months)
  userCount: { type: Number, required: true },

});

const monthlyUserCountSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  dailyUserCounts: [dailyUserCountSchema],
  weeklyUserCounts: [weeklyUserCountSchema],
  totalThisMonth: {type: Number},
}, {
  timestamps: true
});


//  model for the monthly user count schema
const MonthlyUserCount = mongoose.model('MonthlyUserCount', monthlyUserCountSchema);

const updateDailyUserCount = (month, year, day, value) => MonthlyUserCount.findOneAndUpdate(
  { month, year, "dailyUserCounts.day": day }, // Match the specific month, year, and day inside dailyUserCounts object
  { $inc: { "dailyUserCounts.$.userCount": value} }, // update the user count for the matched day
  {new: true}
);

const updateWeeklyUserCount = (month, year, week, value) => MonthlyUserCount.findOneAndUpdate(
  { month, year, "weeklyUserCounts.week": week }, // Match the specific month, year, and day inside dailyUserCounts object
  { $inc: { "weeklyUserCounts.$.userCount": value} }, // update the user count for the matched day
  {new: true}
);

module.exports = {
  MonthlyUserCount,
  updateDailyUserCount,
  updateWeeklyUserCount
};
