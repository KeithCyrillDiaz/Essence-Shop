const mongoose = require('mongoose');

const dailyRevenueCountSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  revenueCount: { type: Number, required: true }
});

const weeklyRevenueCountSchema = new mongoose.Schema({
  week: { type: Number, required: true },  // Week number within the month (1-4, 5 for some months)
  revenueCount: { type: Number, required: true },

});

const monthlyRevenueCountSchema = new mongoose.Schema({
  month: { type: String, required: true },
  year: { type: Number, required: true },
  dailyRevenueCounts: [dailyRevenueCountSchema],
  weeklyRevenueCounts: [weeklyRevenueCountSchema],
  totalThisMonth: {type: Number},
}, {
  timestamps: true
});

//  model for the monthly user count schema
const MonthlyRevenueCount = mongoose.model('MonthlyRevenueCount', monthlyRevenueCountSchema);

const updateDailyRevenueCount = (month, year, day, value) => MonthlyRevenueCount.findOneAndUpdate(
  {month, year, "dailyRevenueCounts.day": day},
  {$inc: {"dailyRevenueCounts.$.revenueCount": value}},
  {new: true}
)

const updateWeeklyRevenueCount = (month, year, week, value) => MonthlyRevenueCount.findOneAndUpdate(
  {month, year, "weeklyRevenueCounts.week": week},
  {$inc: {"weeklyRevenueCounts.$.revenueCount": value}},
  {new: true}
)


module.exports = {
  MonthlyRevenueCount,
  updateWeeklyRevenueCount,
  updateDailyRevenueCount,
};
