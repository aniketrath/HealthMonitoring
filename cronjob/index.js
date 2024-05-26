const cron = require('node-cron');
const hitEndpoints = require('./hitEndpoints');

// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
    console.log('Running cron job to hit all endpoints');
    hitEndpoints();
});
