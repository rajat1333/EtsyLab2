const assert = require("assert");
const {get} = require("./app");
const axios = require("axios");

describe("POST users LOGIN API call", () => {
  const data = {
    email: "admin",
    password: "admin",
  };
  it("should return user details(for storing in redux) when the user logs in", async () => {
    const response = await axios.post("http://localhost:3001/login", data);
    assert.strictEqual(response.status, 200);
  });
});

describe("POST users Home api", () => {
    const data = {
    email_id: "admin",
    };
    it("should return user details(for storing in redux) when the user logs in", async () => {
      const response = await axios.post("http://localhost:3001/home", data);
      assert.strictEqual(response.status, 200);
    });
  });


  describe("POST users SignUp", () => {
    const data = {
        username: "admin",
        password: "admin",
        emailId: "admin"
    };
    it("should return user details(for storing in redux) when the user logs in", async () => {
      const response = await axios.post("http://localhost:3001/signUp", data);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "User Already Exists");
    });
  });


  describe("POST users checkAvailability", () => {
    const data = {
        shopName: "admin",
        emailId: "admin"
    };
    it("should return user details(for storing in redux) when the user logs in", async () => {
      const response = await axios.post("http://localhost:3001/shop/checkAvailability", data);
      assert.strictEqual(response.status, 200);
      assert.strictEqual(response.data, "UserName Unavailable");
    });
  });

  describe("POST users shopExists", () => {
    const data = {
        emailId: "admin",
        name: "admin"
    };
    it("should return user details(for storing in redux) when the user logs in", async () => {
      const response = await axios.post("http://localhost:3001/shop/shopExists", data);
      assert.strictEqual(response.status, 200);
    });
  });
  