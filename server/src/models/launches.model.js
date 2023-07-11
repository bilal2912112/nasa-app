const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

const Default_FlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
saveLaunch(launch);

// launches.set(launch.flightNumber, launch);
// console.log(launches.set(launch.flightNumber, launch));
async function existLaunchWithId(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}
async function getallLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}
async function scheduleNewLaunch(launch) {
  try {
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
  try {
    const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

    if (!latestLaunch) {
      return Default_FlightNumber;
    } else {
      return latestLaunch.flightNumber;
    }
  } catch (error) {
    console.log(`error in getlatest ${error}`);
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
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });
    if (!planet) {
      throw new Error("No matching Planetzl");
    }
    await launchesDatabase.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      { upsert: true }
    );
  } catch (error) {
    console.error(`Could not save planet ${error}`);
  }
}

module.exports = {
  getallLaunches,
  // addnewLaunch,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
};
