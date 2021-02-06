const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require('express');

const config = require("./config.json");
const NpiApi = require("./NpiApi");

const app = express();
const PORT_NUMBER = config.PORT;
const http = require('http').Server(app);

// Configure Express

const npiApi = new NpiApi();

// Middleware to log requests
app.use("/", async (req, res, next) => {
  console.log(moment().format("MM/DD/YYYY HH:mm:ss"), "REQUEST", req.originalUrl);
  next();
});


// Configure Routing
app.get('/', (req, res) => {
  return res.send("NPI API Microservice is up.");
});

app.get('/searchName', async (req, res) => {
  const firstName = req.query.firstname;
  const lastname = req.query.lastname
  return res.send(
    await npiApi.searchByFirstNameLastName(firstName, lastname)
  );
});

// Express-Server Start Up
http.listen(PORT_NUMBER, async () => {
  console.log(`listening on *:${PORT_NUMBER}`);
});