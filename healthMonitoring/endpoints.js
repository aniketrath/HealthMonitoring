const axios = require('axios')

const checkRoute = async (route) => {
    try {
        const response = await axios.get(`http://localhost:8000/${route}`);
        return response.data;
    } catch (error) {
        console.error('Error making Slack API call:', error);
        throw error;
    }
};
module.exports = {
    checkRoute
};