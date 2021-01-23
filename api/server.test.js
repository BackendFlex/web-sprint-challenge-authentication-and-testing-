// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})


// copy over from the assignment

const supertest = require("supertest")
const server = require("../server")

test("GET /", async () => {
    const res = await supertest(server).get("/")
    expect(res.statusCode).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Welcome to our API")
    // console.log(res)
})

const supertest = require("supertest")
const server = require("../server")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy() //close the database connect
})

describe("hobbits integration tests", () => {
    it("gets a list of hobbits", async () => {
        const res = await supertest(server).get("/hobbits")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toBe(4)
        expect(res.body[0].name).toBe("sam")
    })
})

// describe("hobbit by ID", () => {
    it("get the hobbit by ID", async () => {
        const res = await supertest(server).get("/hobbits/2")
        expect(res.statusCode).toBe(404)
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application?json")
        expect(res.body.id).toBe(2)
        expect(res.body.name).toBe("frodo")
    })
// })

it("get the hobbit by ID", async () => {
    const res = await supertest(server).get("/hobbits/50")
    expect(res.statusCode).toBe(404)
    expect(res.type).toBe("application?json")
    expect(res.body.message).toBe("Hobbit not found")
})

it("get the hobbit by ID", async () => {
    const res = await supertest(server)
    .post("/hobbits")
    .send({ name: "bilbo"})
    expect(res.statusCode).toBe(201)
    expect(res.type).toBe("application?json")
    expect(res.body.name).toBe("bilbo")
})


