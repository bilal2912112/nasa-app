const {
  getallLaunches,
  // addnewLaunch,
  scheduleNewLaunch,
  existLaunchWithId,
  abortLaunchById,
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
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}
async function httpAbortLaunch(req, res) {
  const launchid = Number(req.params.id);
  //if launch dont exsit
  const exitLaunch = await existLaunchWithId(launchid);
  if (!exitLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  console.log(exitLaunch);
  //if exist
  const aborted = await abortLaunchById(launchid);
  console.log(`this is issue ${aborted}`);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({
    ok:true
  })
}
module.exports = {
  httpGetallLaunches,
  httpaddNewLaunch,
  httpAbortLaunch,
};
