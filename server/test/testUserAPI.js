'use strict';

const chai = require("chai");
const chaiHttp = require("chai-http");
const { step } = require("mocha-steps");
const expect = chai.expect;
const request = require('supertest');
const UserDao = require('../dao/UserDAO');
const app = require('../index.js');
const serverURL = "http://localhost:3001/api/";

chai.use(chaiHttp);
chai.should();

describe("User Login - Wrong Fields", function () {
    it("T1 wrong Email type", (done) => {
        const user = {
            "username": 9876213,
            "password": "password"
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T2 wrong Email format", (done) => {
        const user = {
            "username": "@google.it",
            "password": "password"
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T3 wrong password format", (done) => {
        const user = {
            "username": "test@google.it",
            "password": 111
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T4 missing email", (done) => {
        const user = {
            "username": "",
            "password": "password"
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T5 missing password", (done) => {
        const user = {
            "username": "test@google.it",
            "password": ""
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T6 wrong password", (done) => {
        const user = {
            "username": "c.basile@hiker.it",
            "password": "password1"
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });

    it("T7 wrong email", (done) => {
        const user = {
            "username": "c1.basile@hiker.it",
            "password": "password"
        }
        chai
            .request(serverURL)
            .post('sessions')
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});

describe("User Registration - Wrong Fields", function () {

    const userDummy = {
        "role": "hut_worker",
        "name": "Pippo",
        "surname": "Caio",
        "phone_number": "3331111111",
        "email": "test@test.it",
        "password": "password"
    };

    it("T1 Wrong Role Type", (done) => {
        let user = { ...userDummy };
        user.role = 1239312;
        user.email = "test1@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T2 Not existing Role", (done) => {
        let user = { ...userDummy };
        user.role = "unhappy_worker";
        user.email = "test2@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T3 Wrong Name type", (done) => {
        let user = { ...userDummy };
        user.name = 1239312;
        user.email = "test3@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T4 wrong Surname type", (done) => {
        let user = { ...userDummy };
        user.surname = 1239312;
        user.email = "test4@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T5 wrong Phone_number type", (done) => {
        let user = { ...userDummy };
        user.phone_number = "not a number";
        user.email = "test5@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T6 wrong Phone_number format", (done) => {
        let user = { ...userDummy };
        user.phone_number = "+++555581928hsaj211239312";
        user.email = "test6@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T7 wrong Email type", (done) => {
        let user = { ...userDummy };
        user.email = 9876213;

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T8 wrong Email format", (done) => {
        let user = { ...userDummy };
        user.email = "@it.";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T9 empty Password", (done) => {
        let user = { ...userDummy };
        user.password = "";
        user.email = "test9@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T10 hut_worker without mandatory fields", (done) => {
        let user = { ...userDummy };
        user.name = "";
        user.surname = "";
        user.phone_number = "";
        user.email = "test10@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T11 local_guide without mandatory fields", (done) => {
        let user = { ...userDummy };
        user.name = "";
        user.surname = "";
        user.phone_number = "";
        user.role = "local_guide";
        user.email = "test11@test.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    it("T12 already existing email", (done) => {
        let user = { ...userDummy };
        user.email = "g.desantis@local_guide.it";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

});

describe("User Registration - New Users", function () {

    let initialUsers; // will be populated with all the users currently in the db
    const userDummy = {
        "role": "hut_worker",
        "name": "Pippo",
        "surname": "Caio",
        "phone_number": "3331111111",
        "email": "test@test.it",
        "password": "password"
    };
    let idUserToDelete;
    let token;

    before('get all users before tests', async function () {
        initialUsers = await UserDao.getAllUsers();
    });

    step("hut_worker with mandatory fields", (done) => {
        let user = { ...userDummy };

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end(async (err, res) => {
                res.should.have.status(201);
                const newUser = await UserDao.getUserByEmail(user.email);
                expect(newUser.role).to.be.equal(user.role);
                expect(newUser.name).to.be.equal(user.name);
                expect(newUser.surname).to.be.equal(user.surname);
                expect(newUser.phone_number).to.be.equal(user.phone_number);
                expect(newUser.email).to.be.equal(user.email);
                idUserToDelete = newUser.id;
                done();
            });
    });

    step("delete hut_worker created", async (done) => {
        await UserDao.deleteUser(idUserToDelete);
        const newUsersList = await UserDao.getAllUsers();
        expect(newUsersList.length).to.be.equal(initialUsers.length);
        done();
    });

    step("local_guide with mandatory fields", (done) => {
        let user = { ...userDummy };
        user.role = "local_guide";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end(async (err, res) => {
                res.should.have.status(201);
                const newUser = await UserDao.getUserByEmail(user.email);
                expect(newUser.role).to.be.equal(user.role);
                expect(newUser.name).to.be.equal(user.name);
                expect(newUser.surname).to.be.equal(user.surname);
                expect(newUser.phone_number).to.be.equal(user.phone_number);
                expect(newUser.email).to.be.equal(user.email);
                idUserToDelete = newUser.id;
                done();
            });
    });

    step("delete local_guide created", async (done) => {
        await UserDao.deleteUser(idUserToDelete);
        const newUsersList = await UserDao.getAllUsers();
        expect(newUsersList.length).to.be.equal(initialUsers.length);
        done();
    });

    step("hiker without mandatory fields", (done) => {
        let user = { ...userDummy };
        user.role = "hiker";
        user.name = "";
        user.surname = "";
        user.phone_number = "";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end(async (err, res) => {
                res.should.have.status(201);
                const newUser = await UserDao.getUserByEmail(user.email);
                expect(newUser.role).to.be.equal(user.role);
                expect(newUser.name).to.be.equal(user.name);
                expect(newUser.surname).to.be.equal(user.surname);
                expect(newUser.phone_number).to.be.equal(user.phone_number);
                expect(newUser.email).to.be.equal(user.email);
                idUserToDelete = newUser.id;
                done();
            });
    });

    step("delete hiker created", async (done) => {
        await UserDao.deleteUser(idUserToDelete);
        const newUsersList = await UserDao.getAllUsers();
        expect(newUsersList.length).to.be.equal(initialUsers.length);
        done();
    });

    step("emergency_operator without mandatory fields", (done) => {
        let user = { ...userDummy };
        user.role = "emergency_operator";
        user.name = "";
        user.surname = "";
        user.phone_number = "";

        chai
            .request(serverURL)
            .post('users')
            .send(user)
            .end(async (err, res) => {
                res.should.have.status(201);
                const newUser = await UserDao.getUserByEmail(user.email);
                expect(newUser.role).to.be.equal(user.role);
                expect(newUser.name).to.be.equal(user.name);
                expect(newUser.surname).to.be.equal(user.surname);
                expect(newUser.phone_number).to.be.equal(user.phone_number);
                expect(newUser.email).to.be.equal(user.email);
                idUserToDelete = newUser.id;
                done();
            });
    });

    step("retrieve token", async (done) => {
        const userInserted = await UserDao.getUserById(idUserToDelete);
        expect(userDummy.email).to.be.equal(userInserted.email);
        token = userInserted.token;
        done();
    });

    step("confirm account with token", async (done) => {
        chai
            .request(serverURL)
            .get(`users/confirm/${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    step("try confirm again account with token", async (done) => {
        chai
            .request(serverURL)
            .get(`users/confirm/${token}`)
            .end((err, res) => {
                res.should.have.status(422);
                done();
            });
    });

    step("missing token", (done) => {
        chai
            .request(serverURL)
            .get(`users/confirm/`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });

    step("confirm emergency_operator token verification", async (done) => {
        const userInserted = await UserDao.getUserById(idUserToDelete);
        expect(userInserted.email_verified).to.be.equal(1);
        done();
    });

    step("delete emergency_operator created", async (done) => {
        await UserDao.deleteUser(idUserToDelete);
        const newUsersList = await UserDao.getAllUsers();
        expect(newUsersList.length).to.be.equal(initialUsers.length);
        done();
    });

});