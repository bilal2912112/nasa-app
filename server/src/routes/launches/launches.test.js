const request = require("supertest");
const app = require("./../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");
const { loadPlanetData } = require("../../models/planet.model");

describe("Launches API", () => {
  beforeAll(async ()=>{
    await mongoConnect()
    await loadPlanetData()
  })
  afterAll(async()=>{
    await mongoDisconnect() 
    
  })
  describe("Test Get /launches", () => {
    test("should  response with 200", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("Content-Type", /json/);
    });
  });
  describe("Test Post /Launches", () => {
    const compeleteLaunchDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186",
      launchDate: "January 4,2028",
    };
    const compeleteLaunchWithOutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186",
    };
    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-186",
      launchDate: "Jaan",
    };

    test("should response with 200", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(compeleteLaunchDate)
        .expect(201)
        .expect("Content-Type", /json/);
      const requestDate = new Date(compeleteLaunchDate.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);
      expect(response.body).toMatchObject(compeleteLaunchWithOutDate);
    });

    test("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(compeleteLaunchWithOutDate)

        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required  properties",
      });
    });

    test("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect("Content-Type", /json/);
      expect(response.body).toStrictEqual({
        error: "Invalid Date",
      });
    });
  });
});
