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
    for (let min = 0, max = 100; min < 100, max < 200; ++min, ++max) {
        const timeout = randomizeTimeout([min, max])
        expect(timeout).toBeGreaterThanOrEqual(min)
        expect(timeout).toBeLessThanOrEqual(max)
    }
})
