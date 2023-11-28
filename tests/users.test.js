const request = require("supertest");
const crypto = require("node:crypto");
const app = require("../src/app");
const database = require("../database")

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
});

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };
  });

  describe("POST /api/users", () => {
    it("should return created user", async () => {
      const newUser = {
        firstname: "Marie",
        lastname: "Martin",
        email: `${crypto.randomUUID()}@wild.co`,
        city: "Paris",
        language: "French",
      };
  
      const response = await request(app).post("/api/users").send(newUser);
  
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty("id");
      expect(typeof response.body.id).toBe("number");
  
     
  
      const [result] = await database.query(
        "SELECT * FROM users WHERE id=?",
        response.body.id
      );
  
      const [userInDatabase] = result;
  
      expect(userInDatabase).toHaveProperty("firstname");
      expect(typeof userInDatabase.firstname).toBe("string");
      expect(userInDatabase).toHaveProperty("lastname");
      expect(typeof userInDatabase.lastname).toBe("string");
      expect(userInDatabase).toHaveProperty("email");
      expect(typeof userInDatabase.email).toBe("string");
      expect(userInDatabase).toHaveProperty("city");
      expect(typeof userInDatabase.city).toBe("string");
      expect(userInDatabase).toHaveProperty("language");
      expect(typeof userInDatabase.language).toBe("string");
      expect(userInDatabase.email).toStrictEqual(newUser.email);
  
    });
  
  
      it("should return an error", async () => {
        const userWithMissingProps = { firstname: "Toto" };
    expect(userWithMissingProps).toHaveProperty("firstname");
  
  
        const response = await request(app)
          .post("/api/users")
          .send(userWithMissingProps);
    
        expect(response.status).toEqual(500);
    });
  });

  describe("PUT /api/users/:id", () => {
    it ('should edit user', async () => {
      const newUser = {
        firstname: "José",
        lastname: "Toto",
        email: `${crypto.randomUUID()}@wild.co`,
        city: "Paris",
        language: "French"
      };
      const [result] = await database.query("INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [newUser.firstname, newUser.lastname, newUser.email, newUser.city, newUser.language]);

      const id = result.insertId;

      const updatedUser = {
        firstname: "Josiane",
        lastname: "Tata",
        email: `${crypto.randomUUID()}@wild.co`,
        city: "Madrid",
        language: "French" 
      };

const response = await request(app).put(`/api/users/${id}`).send(updatedUser);

expect(response.status).toEqual(204);

const [res] = await database.query("SELECT * FROM users WHERE id=?", id);

const [userInDatabase] = res;

expect(userInDatabase).toHaveProperty("id");


expect(userInDatabase).toHaveProperty("firstname");
expect(typeof userInDatabase.firstname).toBe("string");
expect(userInDatabase.firstname).toStrictEqual(updatedUser.firstname);

expect(userInDatabase).toHaveProperty("lastname");
expect(typeof userInDatabase.lastname).toBe("string");
expect(userInDatabase.lastname).toStrictEqual(updatedUser.lastname);

expect(userInDatabase).toHaveProperty("email");
expect(typeof userInDatabase.email).toBe("string");
expect(userInDatabase.email).toStrictEqual(updatedUser.email);

expect(userInDatabase).toHaveProperty("city");
expect(typeof userInDatabase.city).toBe("string");
expect(userInDatabase.city).toStrictEqual(updatedUser.city);

expect(userInDatabase).toHaveProperty("language");
expect(typeof userInDatabase.language).toBe("string");
expect(userInDatabase.language).toStrictEqual(updatedUser.language);
    })

    it("should return an error", async () => {
      const userWithMissingProps = { firstname: "Titi" };

      const response = await request (app)
      .put(`/api/users/1`)
      .send(userWithMissingProps);

      expect (response.status).toEqual(500);
    });

  it("should return no movie", async () => {
    const newUser = {
      firstname: "Clara",
      lastname: "Papa",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Madrid",
      language: "French"  
    };

    const response = await request(app).put("/api/users/0").send(newUser);

    expect (response.status).toEqual(404);
  })
  }) 
});
afterAll(() => database.end());