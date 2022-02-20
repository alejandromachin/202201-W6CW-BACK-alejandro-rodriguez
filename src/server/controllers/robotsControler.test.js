const Robot = require("../../database/models/Robot");
const { getAllRobots, getRobotById, postRobot } = require("./robotsControler");

jest.mock("../../database/models/Robot");

describe("Given a getAllRobots function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call its json method with an array of robots", async () => {
      const res = {
        json: jest.fn(),
      };

      const robots = [
        {
          id: 1,
          name: "Robomach",
          velocity: 3,
          resistency: 6,
          dateOfCreation: "",
        },
        {
          id: 2,
          name: "Robotron",
          velocity: 1,
          resistency: 10,
          dateOfCreation: "18/02/2021",
        },
      ];

      Robot.find = jest.fn().mockResolvedValue(robots);

      await getAllRobots(null, res);

      expect(res.json).toHaveBeenCalledWith(robots);
      expect(robots).toEqual(robots);
    });
  });
});

describe("Given a getRobotById function", () => {
  describe("When it receives a response", () => {
    test("Then if the robot exists it should call its json method with one robot", async () => {
      const robot = {
        id: 1,
        name: "Robomach",
        velocity: 3,
        resistency: 6,
        dateOfCreation: "",
      };

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { id: 1 },
      };

      Robot.findById = jest.fn().mockResolvedValue(robot);

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(robot);
    });
    test("Then if the id of the robotis not correct it should call next method with the error", async () => {
      const req = {
        params: { id: "not correct" },
      };

      const next = jest.fn();
      const error = new Error("Invalid id format");

      Robot.findById = jest.fn().mockRejectedValue(error);

      await getRobotById(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then if the robot doesn't exist it should call next method with the error", async () => {
      const req = {
        params: { id: 1 },
      };

      const next = jest.fn();
      const error = new Error("Sorry, robot not found");

      Robot.findById = jest.fn().mockResolvedValue(null);

      await getRobotById(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a postRobot function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call its json method with the robot created", async () => {
      const newRobot = {
        name: "testbot",
      };

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      Robot.create = jest.fn().mockResolvedValue(newRobot);

      await postRobot(newRobot, res);

      expect(res.json).toHaveBeenCalledWith(newRobot);
    });
  });
});
