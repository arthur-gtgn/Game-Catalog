const request = require("supertest");
const app = require("../server");

describe("POST /login", () => {
    it("should return 401 if authentication failed", async () => {
        // TODO: Add test case for authentication failure
        const response = await request(app)
            .post("/login")
            .send({ email: "invalid", password: "invalid" });
        expect(response.status).toBe(401);
    });

    it("should return 200 if login is successful", async () => {
        // TODO: Add test case for successful login
        const response = await request(app).post("/login").send({
            email: "arthur.gatignol@efrei.net",
            password: "administrator",
        });
        expect(response.status).toBe(200);
    });

    // Generate unit test to see if a cookie is generated
    it("should return a cookie if login is successful", async () => {
        const response = await request(app).post("/login").send({
            email: "arthur.gatignol@efrei.net",
            password: "administrator",
        });
        expect(response.headers["Set-Cookie"]).toBeDefined();
    });
});
