const fs = require('fs');
const path = require('path');
const axios = require('axios');

const logDirectory = '/var/log/app_logs';
// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}
const logFile = path.join(logDirectory, 'output.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });
// Redirect console.log and console.error to the log file
console.log = function (message, ...optionalParams) {
  logStream.write(`LOG: ${message}\n`);
  if (optionalParams.length) {
    logStream.write(`LOG: ${optionalParams.join(' ')}\n`);
  }
};
console.error = function (message, ...optionalParams) {
  logStream.write(`ERROR: ${message}\n`);
  if (optionalParams.length) {
    logStream.write(`ERROR: ${optionalParams.join(' ')}\n`);
  }
};
const endpoints = [
  'http://10.136.102.206:2500/checkshifts',
  'http://10.136.102.206:2500/checkdjango',
  'http://10.136.102.206:2500/checkfive9',
  'http://10.136.102.206:2500/checkslack',
  // Add all your endpoints here
];

async function hitEndpoints() {
  for (const endpoint of endpoints) {
    const startTime = Date.now(); // Record the start time
    try {
      const response = await axios.get(endpoint);
      const endTime = Date.now(); // Record the end time
      const responseTime = endTime - startTime; // Calculate the response time
      console.log(`Success: ${endpoint} | Status: ${response.status} | Time: ${responseTime}ms`);
    } catch (error) {
      const endTime = Date.now(); // Record the end time even in case of an error
      const responseTime = endTime - startTime; // Calculate the response time
      console.error(`Error: ${endpoint} | Message: ${error.message} | Time: ${responseTime}ms`);
    }
  }
}

module.exports = hitEndpoints;

// Example usage (if you want to run it directly)
if (require.main === module) {
  hitEndpoints();
}
