const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();
const axios = require("axios");

const Default_FlightNumber = 100;
// const launch = {
//   flightNumber: 100, //flight_number
//   mission: "Kepler Exploration X", //name
//   rocket: "Explorer IS1", //rocket.name
//   launchDate: new Date("December 27, 2030"), //date_local
//   target: "Kepler-442 b", //not applicable
//   customer: ["ZTM", "NASA"], //payload.customer for each payload
//   upcoming: true, //upcoming
//   success: true, //success
// };
// saveLaunch(launch);
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";
async function populateLaunchData() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",  
          select: {
            customers: 1,
          },  
        },
      ],
    },
  });
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };
    console.log(
      `${launch.flightNumber} ${launch.rocket} ${launch.launchDate} ${launch.customers}   `
    );
    await saveLaunch(launch);
  }
}
async function loadLaunchData() {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (firstLaunch) {
    console.log("Launch Data already loaded");
  } else {
    await populateLaunchData();
  }
}

// launches.set(launch.flightNumber, launch);
// console.log(launches.set(launch.flightNumber, launch));
async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter);
}
async function existLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}
async function getallLaunches(skip,limit) {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 }).sort({flightNumber:1}).skip(skip).limit(limit);
}
async function scheduleNewLaunch(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
    if (!planet) {
      throw new Error("No matching Planetzl"); 
    }
    const newFlightNumber = (await getLatestFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["ZTM", "NASA"],
      flightNumber: newFlightNumber,
    });
    await saveLaunch(newLaunch);
  } catch (error) {
    console.log(`thier is error ${error}`);
  }
}
// function addnewLaunch(launch) {
//   latestFlightNumber++;
//   launches.set(
//     latestFlightNumber,
//     Object.assign(launch, {
//       customer: ["ZTM", "NASA"],
//       upcoming: true,
//       success: true,
//       flightNumber: latestFlightNumber,
//     })
//   );
// }
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return Default_FlightNumber;
  } else {
    return latestLaunch.flightNumber;
  }
}

async function abortLaunchById(launchid) {
  const aborted = await launchesDatabase.updateOne(
    { flightNumber: launchid },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    { flightNumber: launch.flightNumber },
    launch,
    { upsert: true }
  );
}

module.exports = {
  getallLaunches,
  // addnewLaunch,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
  loadLaunchData,
};
