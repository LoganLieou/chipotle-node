const { Chipotle } = require('../src/index')

const test = require('node:test')
const assert = require('node:assert')

test("get locations black box test", async (_t) => {
    const chipotle = new Chipotle()
    const result = await chipotle.getLocations('75024')
    assert.notStrictEqual(result, null)
})

test("find cheapest black box test", async (_t) => {
    const chipotle = new Chipotle()
    await chipotle.findCheapest('75024')
})
