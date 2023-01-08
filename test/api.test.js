import request from "supertest";
import app from "../src/app.js";
import { users } from "../src/data/index.js";

const usersUuids = Array.from(users.keys());

describe("GET Users", () => {
    test("valid request /api/users", async () => {
        await request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test("invalid request /api/userss", async () => {
        await request(app)
            .get('/api/userss')
            .expect(404);
    })
})

describe("GET User", () => {
    test(`valid request /api/users/${usersUuids[0]}`, async () => {
        await request(app)
            .get(`/api/users/${usersUuids[0]}`)
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test(`invalid request /api/user/${usersUuids[0]}`, async () => {
        await request(app)
            .get(`/api/user/${usersUuids[0]}`)
            .expect(404);
    })

    test(`valid uuid /api/users/${usersUuids[0]}`, async () => {
        await request(app)
            .get(`/api/users/${usersUuids[0]}`)
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test("invalid uuid /api/users/uuid", async () => {
        await request(app)
            .get("/api/users/uuid")
            .expect(400);
    })

    test("uuid doesn't exist", async () => {
        await request(app)
            .get("/api/users/c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd")
            .expect(404);
    })
})

describe("POST request", () => {
    test("valid request /api/users", async () => {
        await request(app)
            .post('/api/users')
            .send({ username: "Jest 1", age: 33, hobbies: ["testing"] })
            .expect('Content-Type', /json/)
            .expect(201);
    })

    test("invalid request /api/users/add", async () => {
        await request(app)
            .post('/api/userss')
            .send({ username: "Jest 2", age: 34, hobbies: ["testing"] })
            .expect(404);
    })

    test("valid body", async () => {
        await request(app)
            .post('/api/users')
            .send({ username: "Jest 3", age: 35, hobbies: ["testing"] })
            .expect('Content-Type', /json/)
            .expect(201);
    })

    test("invalid body", async () => {
        await request(app)
            .post('/api/users')
            .send({ age: 35, hobbies: ["testing"] })
            .expect(400);
    })
})

describe("PUT request", () => {
    test(`valid request /api/users/${usersUuids[0]}`, async () => {
        await request(app)
            .put(`/api/users/${usersUuids[0]}`)
            .send({ username: "Jest 1", age: 33, hobbies: ["testing"] })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test(`invalid request /api/user/${usersUuids[0]}`, async () => {
        await request(app)
            .put(`/api/user/${usersUuids[0]}`)
            .send({ username: "Jest 2", age: 34, hobbies: ["testing"] })
            .expect(404);
    })

    test(`valid uuid /api/users/${usersUuids[0]}`, async () => {
        await request(app)
            .put(`/api/users/${usersUuids[0]}`)
            .send({ username: "Jest 3", age: 35, hobbies: ["testing"] })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    test("invalid uuid request /api/users/uuid", async () => {
        await request(app)
            .put('/api/users/uuid')
            .send({ username: "Jest 4", age: 36, hobbies: ["testing"] })
            .expect(400);
    })

    test("uuid doesn't exist", async () => {
        await request(app)
            .put("/api/users/c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd")
            .send({ username: "Jest 5", age: 37, hobbies: ["testing"] })
            .expect(404);
    })
})

describe("DELETE request", () => {
    test(`valid request /api/users/${usersUuids[1]}`, async () => {
        await request(app)
            .delete(`/api/users/${usersUuids[1]}`)
            .expect(204);
    })

    test(`invalid request /api/user/${usersUuids[1]}`, async () => {
        await request(app)
            .delete(`/api/user/${usersUuids[1]}`)
            .expect(404);
    })

    test(`valid uuid /api/users/${usersUuids[0]}`, async () => {
        await request(app)
            .delete(`/api/users/${usersUuids[0]}`)
            .expect(204);
    })

    test("invalid uuid request /api/users/uuid", async () => {
        await request(app)
            .delete('/api/users/uuid')
            .expect(400);
    })

    test("uuid doesn't exist", async () => {
        await request(app)
            .delete("/api/users/c73bcdcc-2669-4bf6-81d3-e4ae73fb11fd")
            .expect(404);
    })
})