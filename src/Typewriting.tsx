import * as React from "react"

enum Tick {
    INIT,
    WRITE,
    DELETE,
    START_DELETE,
}

const DEFAULTS = {
    WRITE_SPEED_MS: 100,
    DELETE_SPEED_MS: 60,
    WAIT_BEFORE_DELETE_MS: 9000,
}

type DelayNumber = number | [number, number]

interface Props {
    strings: string[]
    waitBeforeDeleteMs?: DelayNumber
    writeSpeedMs?: DelayNumber
    deleteSpeedMs?: DelayNumber
    children: ({ currentText }: { currentText: string }) => React.ReactNode
}

interface State {
    currentStringIdx: number
    currentCharPos: number
    isDeleting: boolean
}

const randomizeTimeout = (ms: DelayNumber): number => Array.isArray(ms) ? (
    // random value inside the specified min and max thresholds
    ms[0] + (Math.random() * (ms[1] - ms[0]))
) : (
    // randomize the value - with a minimum threshold
    Math.max(Math.random() * ms, 30)
)

export default class Typewriting extends React.PureComponent<Props, State> {

    private tickTimeout: number | null = null

    state = {
        currentStringIdx: 0,
        currentCharPos: 0,
        isDeleting: false,
    }

    componentDidMount() {
        this.queueTick(Tick.INIT)
    }

    componentWillUnmount() {
        if (this.tickTimeout != null) {
            clearTimeout(this.tickTimeout)
        }
    }

    private queueTick(tickType: Tick) {
        const {
            writeSpeedMs,
            deleteSpeedMs,
            waitBeforeDeleteMs,
        } = this.props

        const timeout =
            tickType === Tick.INIT ? 0 :
            tickType === Tick.WRITE ? randomizeTimeout(writeSpeedMs != null ? writeSpeedMs : DEFAULTS.WRITE_SPEED_MS) :
            tickType === Tick.DELETE ? randomizeTimeout(deleteSpeedMs != null ? deleteSpeedMs : DEFAULTS.DELETE_SPEED_MS) :
            tickType === Tick.START_DELETE ? waitBeforeDeleteMs != null ? waitBeforeDeleteMs : DEFAULTS.WAIT_BEFORE_DELETE_MS :
            0 // ¯\_(ツ)_/¯

        this.tickTimeout = setTimeout(() => this.tick(), timeout)
    }

    private moveToNextText() {
        const { strings } = this.props
        const { currentStringIdx } = this.state
        const nextTextIdx = currentStringIdx + 1
        this.setState({
            isDeleting: false,
            currentStringIdx: nextTextIdx < strings.length ? nextTextIdx : 0,
            currentCharPos: 0,
        })
    }

    private tick() {
        const { strings } = this.props
        const {
            currentStringIdx,
            currentCharPos,
            isDeleting,
        } = this.state

        const currentText = strings[currentStringIdx]

        const nextCharPos = isDeleting
            ? currentCharPos - 1
            : currentCharPos + 1

        if (isDeleting) {
            if (nextCharPos < 0) {
                this.moveToNextText()
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
            }
            this.queueTick(Tick.DELETE)
        } else {
            if (nextCharPos > currentText.length) {
                this.setState({
                    isDeleting: true,
                })
                this.queueTick(Tick.START_DELETE)
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
                this.queueTick(Tick.WRITE)
            }
        }
    }

    render() {
        const { strings } = this.props
        const {
            currentStringIdx,
            currentCharPos,
        } = this.state

        const currentString = strings[currentStringIdx]
        const currentText = currentString.slice(0, currentCharPos)

        return <>{this.props.children({ currentText })}</>
    }
}
