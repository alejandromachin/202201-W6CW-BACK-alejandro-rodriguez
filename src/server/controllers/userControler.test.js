const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../database/models/User");
const getToken = require("./userControler");

jest.mock("../../database/models/User");
jest.mock("bcrypt");

describe("Given a getToken function", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then if the user doesnt exist it should throw an error with the code 404 and the message 'sorry, you are not invited to the party'", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };

      const next = jest.fn();
      const error = new Error("Sorry, you are not invited to the party");

      User.find = jest.fn().mockRejectedValue(null);

      await getToken(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then if the user exists but the password isnt right it should return the error 'You are not who you say you are'", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };
      const user = req.body;

      const error = new Error("Sorry, you are not who you say you are");

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await getToken(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
    test("Then if the user exists and the password is right it should call the json method with the token ", async () => {
      const req = {
        body: { username: "machinazo", password: "123" },
      };
      const res = {
        json: jest.fn(),
      };
      const token = "I'm a token";
      const user = req.body;

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue(user);

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jsonwebtoken.sign = jest.fn().mockReturnValue(token);

      await getToken(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
});
