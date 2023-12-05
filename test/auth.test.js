const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../server.js");

chai.use(chaiHttp);

describe("Authentication", () => {
    it("should login successfully with correct credentials", (done) => {
        chai.request(app)
            .post("/login") // Update with your route
            .send({
                email: "arthur.gatignol@gmail.com",
                password: "administrator",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                // Add more assertions here
                done();
            });
    });

    // More tests for failed login, logout, protected routes, etc.
});

describe("Passport Authentication", () => {
    it("should login successfully with correct credentials", (done) => {
        chai.request(app)
            .post("/login") // Your login route
            .send({
                email: "arthur.gatignol@gmail.com",
                password: "administrator",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.cookie("user_sid"); // Replace with your session cookie name
                done();
            });
    });

    // More tests for logout, protected routes, etc.
});
