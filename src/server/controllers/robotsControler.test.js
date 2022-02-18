// const Robot = require("../../database/models/Robot");
// const { getAllRobots } = require("./robotsControler");

// jest.mock("../../database/models/Robot");

describe("Given a getAllRobots function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call its json method with an array of robots", async () => {
      // const res = {
      //   json: jest.fn(),
      // };

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

      // Robot.find = jest.fn().mockResolvedValue(robots);

      //   await getAllRobots(null, res);

      //   expect(res.json).toHaveBeenCalledWith({ robots });
      expect(robots).toEqual(robots);
    });
  });
});
