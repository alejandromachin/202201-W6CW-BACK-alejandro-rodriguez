require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("..");

const connectToDatabase = require("../../database");
const Robot = require("../../database/models/Robot");
const User = require("../../database/models/User");

let dataBase;
let token;

beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const stringConnection = dataBase.getUri();
  await connectToDatabase(stringConnection);

  await User.create({
    username: "machinazo",
    password: "$2b$10$tqqi/uVD3T0TSHf7op08ie.e5uwaLqw9BsOUJpiAjh58l141M/44W",
  });

  const user = { username: "machinazo", password: "contrasena1234" };

  const { body } = await supertest(app).post("/login/").send(user);

  token = body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
  await dataBase.stop();
});

beforeEach(async () => {
  await Robot.create({
    name: "Robomach",
    velocity: "3",
    resistance: "6",

    image:
      "https://atlas-content-cdn.pixelsquid.com/stock-images/vintage-toy-robo...",
  });
});
afterEach(async () => {
  await Robot.deleteMany({});
});

describe("Given a /robots/ endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should respond with the object with the porperty name of the robot ", async () => {
      const { body } = await supertest(app).get("/robots/").expect(200);

      expect(body[0]).toHaveProperty("name");
    });
  });
});

describe("Given a /robots/:id endpoint", () => {
  describe("When it receves a GET request with an id ", () => {
    test("Then it should return the robot with the id ", async () => {
      const robot = await Robot.findOne({ name: "Robomach" });

      const { body } = await supertest(app)
        .get(`/robots/${robot.id}`)
        .expect(200);

      expect(body).toHaveProperty("_id", robot.id);
    });
  });
});

describe("Given a /robots/create endpoint", () => {
  describe("When it receves a POST request with a robot ", () => {
    test("Then it should return the robot with the id ", async () => {
      const robot = {
        name: "Guillemnator",
        resistance: "1",
        velocity: "4",
        image: "hola",
      };

      const { body } = await supertest(app)
        .post(`/robots/create`)
        .set("authorization", `Bearer ${token}`)
        .send(robot)
        .expect(201);

      expect(body).toHaveProperty("_id");
    });
  });
});
