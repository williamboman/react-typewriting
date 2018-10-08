import { MINIMUM_THRESHOLD, randomizeTimeout } from "../src/utils"

test("randomizes single timeout range number correctly", () => {
    for (let i = 30; i <= 100; ++i) {
        const timeout = randomizeTimeout(i)
        expect(timeout).toBeGreaterThanOrEqual(MINIMUM_THRESHOLD)
        expect(timeout).toBeLessThanOrEqual(i)
    }
})

test("randomizes single timeout range above MINIMUM_THRESHOLD", () => {
    expect(randomizeTimeout(MINIMUM_THRESHOLD - 10)).toBe(MINIMUM_THRESHOLD)
})

test("randomizes timeout range number correctly", () => {
    let min = 0
    let max = 100
    let i = 0
    while (i++ < 100) {
        const timeout = randomizeTimeout([min, max])
        expect(timeout).toBeGreaterThanOrEqual(min)
        expect(timeout).toBeLessThanOrEqual(max)
        ++min
        ++max
    }
})
