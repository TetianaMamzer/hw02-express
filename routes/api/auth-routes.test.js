const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { User } = require("../../models/user");

const { DB_HOST_TEST } = require("../../config");

describe("test /api/auth/register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(3000);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
   await User.deleteMany({});
  });

  test("test register route with correct data", async () => {
    const registerData = {
      email: "tania190077@gmail.com",
      password: "123456",
      subscription: "starter",
    };

    const res = await request(app)
      .post("/api/users/register")
      .send(registerData);
    const { email, subscription } = registerData;
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(email);
    expect(res.body.subscription).toBe(subscription);

    const user = await User.findOne({ email });
    expect(user.email).toBe(email);
  });

});
