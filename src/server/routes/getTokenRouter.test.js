require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const app = require("..");

const connectToDatabase = require("../../database");
const User = require("../../database/models/User");

let dataBase;

beforeAll(async () => {
  dataBase = await MongoMemoryServer.create();
  const stringConnection = dataBase.getUri();
  await connectToDatabase(stringConnection);
});

afterAll(async () => {
  await mongoose.connection.close();
  await dataBase.stop();
});

beforeEach(async () => {
  await User.create({
    username: "machinazo",
    password: "$2b$10$tqqi/uVD3T0TSHf7op08ie.e5uwaLqw9BsOUJpiAjh58l141M/44W",
  });
});
afterEach(async () => {
  await User.deleteMany({});
});

describe("Given a /login/", () => {
  describe("When it receives a request with a post method with the correct username and password", () => {
    test("Then it should return a token and status 200", async () => {
      const user = { username: "machinazo", password: "contrasena1234" };

      const { body } = await supertest(app)
        .post("/login/")
        .send(user)
        .expect(200);

      expect(body).toHaveProperty("token");
    });
  });
  describe("When it receives a request with a post method with the wrong username", () => {
    test("Then it should return the message Sorry, you are not invited to the party and status 404", async () => {
      const user = { username: "machinazo123", password: "contrasena1234" };

      const { body } = await supertest(app)
        .post("/login/")
        .send(user)
        .expect(404);

      expect(body).toHaveProperty("error");
    });
  });

  describe("When it receives a request with a post method with the wrong password", () => {
    test("Then it should return the message Sorry, you are not invited to the party and status 404", async () => {
      const user = { username: "machinazo", password: "contrasena1234as" };

      const { body } = await supertest(app)
        .post("/login/")
        .send(user)
        .expect(403);

      expect(body).toHaveProperty("error");
    });
  });
});
