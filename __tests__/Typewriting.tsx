import * as React from "react"
import { mount } from "enzyme"
import { Typewriting } from "../src/Typewriting"

jest.useFakeTimers()

test("calls child function with correct arguments", () => {
    const childFn = jest.fn(({ currentText }) => currentText)
    mount(<Typewriting strings={["foo bar", "lorem ipsum"]}>{childFn}</Typewriting>)

    let n = 0
    while (n++ < ["foo bar", "lorem ipsum"].join(" ").length * 2) {
        jest.runOnlyPendingTimers()
    }

    expect(childFn.mock.calls).toMatchObject([
        [{ currentText: "" }],
        [{ currentText: "f" }],
        [{ currentText: "fo" }],
        [{ currentText: "foo" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo" }],
        [{ currentText: "fo" }],
        [{ currentText: "f" }],
        [{ currentText: "" }],
        [{ currentText: "" }],
        [{ currentText: "l" }],
        [{ currentText: "lo" }],
        [{ currentText: "lor" }],
        [{ currentText: "lore" }],
        [{ currentText: "lorem" }],
        [{ currentText: "lorem " }],
        [{ currentText: "lorem i" }],
        [{ currentText: "lorem ip" }],
        [{ currentText: "lorem ips" }],
        [{ currentText: "lorem ipsu" }],
        [{ currentText: "lorem ipsum" }],
        [{ currentText: "lorem ipsum" }],
        [{ currentText: "lorem ipsu" }],
        [{ currentText: "lorem ips" }],
        [{ currentText: "lorem ip" }],
        [{ currentText: "lorem i" }],
        [{ currentText: "lorem " }],
        [{ currentText: "lorem" }],
        [{ currentText: "lore" }],
        [{ currentText: "lor" }],
        [{ currentText: "lo" }],
        [{ currentText: "l" }],
    ])
})

test("respects writeSpeedMs prop", () => {
    const childFn = jest.fn(({ currentText }) => currentText)
    mount(
        <Typewriting writeSpeedMs={[100, 100]} strings={["foo bar"]}>
            {childFn}
        </Typewriting>,
    )

    jest.advanceTimersByTime(300)
    expect(childFn.mock.calls).toMatchObject([
        [{ currentText: "" }],
        [{ currentText: "f" }],
        [{ currentText: "fo" }],
        [{ currentText: "foo" }],
        [{ currentText: "foo " }],
    ])
    jest.advanceTimersByTime(300)
    expect(childFn.mock.calls).toMatchObject([
        [{ currentText: "" }],
        [{ currentText: "f" }],
        [{ currentText: "fo" }],
        [{ currentText: "foo" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo bar" }],
    ])
})

test("respects the deleteSpeedMs prop", () => {
    const childFn = jest.fn(({ currentText }) => currentText)
    const wrapper = mount(
        <Typewriting deleteSpeedMs={[100, 100]} strings={["foo bar"]}>
            {childFn}
        </Typewriting>,
    )

    while (wrapper.find(Typewriting).text() !== "foo bar") {
        jest.runOnlyPendingTimers()
    }
    jest.runOnlyPendingTimers()
    jest.runOnlyPendingTimers()

    jest.advanceTimersByTime(300)
    expect(childFn.mock.calls).toMatchObject([
        [{ currentText: "" }],
        [{ currentText: "f" }],
        [{ currentText: "fo" }],
        [{ currentText: "foo" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo" }],
    ])

    jest.advanceTimersByTime(300)
    expect(childFn.mock.calls).toMatchObject([
        [{ currentText: "" }],
        [{ currentText: "f" }],
        [{ currentText: "fo" }],
        [{ currentText: "foo" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo bar" }],
        [{ currentText: "foo ba" }],
        [{ currentText: "foo b" }],
        [{ currentText: "foo " }],
        [{ currentText: "foo" }],
        [{ currentText: "fo" }],
        [{ currentText: "f" }],
        [{ currentText: "" }],
    ])
})

test("calls the render prop function with correct values", () => {
    const childFn = jest.fn(val => null)
    mount(
        <Typewriting
            waitBeforeDeleteMs={0}
            deleteSpeedMs={[0, 0]}
            writeSpeedMs={[100, 100]}
            strings={["foo bar", "lorem ipsum"]}>
            {childFn}
        </Typewriting>,
    )
    expect(childFn.mock.calls[0]).toEqual([
        {
            currentText: "",
            fullCurrentText: "foo bar",
        },
    ])
    jest.advanceTimersByTime(700)
    expect(childFn.mock.calls[16]).toEqual([
        {
            currentText: "",
            fullCurrentText: "lorem ipsum",
        },
    ])
})
