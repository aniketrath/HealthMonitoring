const express = require("express")
const prom_client = require('prom-client')
const response_time = require('response-time')
const {
    checkRoute
} = require('./endpoints')

const app = express()
const PORT = 2500

const collectDefaultMetrics = prom_client.collectDefaultMetrics;
collectDefaultMetrics({ register: prom_client.register });

const reqResTime = new prom_client.Histogram({
    name: "http_express_django_response",
    help: "checks App Response Time ",
    labelNames: ["methord", "route", "statusCode"],
    buckets: [1, 50, 100, 200, 400, 600, 800, 1000, 1500, 2000]
});
app.use(response_time((req, res, time) => {
    reqResTime.labels({
        methord: req.method,
        route: req.url,
        statusCode: res.statusCode,
    })
        .observe(time)
}))

app.get('/metrics', async (req, res) => {
    res.setHeader("Content-Type", prom_client.register.contentType);
    const metrics = await prom_client.register.metrics();
    res.send(metrics);
});

// Define a route to make the API call
app.get('/test', async (req, res) => {
    try {
        const data = await checkRoute('test');
        res.json(data);
    } catch (error) {
        res.status(500).send('Error making Slack API call');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});