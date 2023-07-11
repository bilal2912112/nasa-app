const {
  getallLaunches,
  // addnewLaunch,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById
} = require("../../models/launches.model");
async function httpGetallLaunches(req, res) {
  return res.status(200).json(await getallLaunches());
}
async function httpaddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required  properties",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }
  // addnewLaunch(launch);
  await scheduleNewLaunch(launch)
  return res.status(201).json(launch);
}
function httpAbortLaunch(req, res) {
  const launchid =Number (req.params.id);
  //if launch dont exsit
  if (!existLaunchWithId(launchid)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  //if exist
  const aborted=abortLaunchById(launchid)
  return res.status(200).json(aborted);
}
module.exports = {
  httpGetallLaunches,
  httpaddNewLaunch,
  httpAbortLaunch,
};
