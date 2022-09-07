require('dotenv').config()
const express = require('express')
const app = express()
const {getCityInfo, getJobs} = require("./util")


// TODO: import the getCityInfo and getJobs functions from util.js

// TODO: Statically serve the public folder
app.use(express.static("./public"))

// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
app.get("/api/city/:city", async (req,res) => {
  let {city} = req.params
  
  try {
    const cityInfo = await getCityInfo(city)
    const jobs = await getJobs(city)

    if (cityInfo || jobs) {
      res.send({cityInfo: cityInfo, jobs:jobs})
    } else {
      res.status(404).send({error: "An error has occurred!"})
    }
  } catch (error) {
    console(error)
    res.status(404).send({error: "An error has occurred!"})
  }
  
})


module.exports = app

