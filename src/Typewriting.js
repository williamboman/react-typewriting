const React = require('react')
const {PureComponent} = React
const PropTypes = require('prop-types')

const TICK_INIT = 'TICK_INIT'
const TICK_WRITE = 'TICK_WRITE'
const TICK_DELETE = 'TICK_DELETE'
const START_DELETE = 'START_DELETE'

function getComponentProps({...props}) {
    delete props.strings
    delete props.stringPropName
    delete props.waitBeforeDeleteMs
    delete props.writeSpeedMs
    delete props.deleteSpeedMs
    delete props.component
    return props
}

const SpeedTuple = (props, propName, componentName) => {
    const prop = props[propName]
    const isValid = (
        Array.isArray(prop) &&
        prop.length === 2 &&
        typeof prop[0] === 'number' && typeof prop[1] === 'number'
    )
    if (!isValid) {
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Expected a tuple of numbers.'
        )
    }
}

const NumberInterval = PropTypes.oneOfType([
    PropTypes.number,
    SpeedTuple,
])

const randomizeTimeout = (ms) => Array.isArray(ms) ? (
    // random value inside the specified min and max thresholds
    ms[0] + (Math.random() * (ms[1] - ms[0]))
) : (
    // randomize the value - with a minimum threshold
    Math.max(Math.random() * ms, 30)
)

class Typewriting extends PureComponent {

    static propTypes = {
        strings: PropTypes.array.isRequired,
        stringPropName: PropTypes.string,
        waitBeforeDeleteMs: PropTypes.number,
        writeSpeedMs: NumberInterval,
        deleteSpeedMs: NumberInterval,
        component: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.string,
        ]),
    }

    static defaultProps = {
        waitBeforeDeleteMs: 9000,
        writeSpeedMs: 100,
        deleteSpeedMs: 60,
        stringPropName: 'children',
        component: 'span',
    }

    constructor(props) {
        super(props)
        this._ticker = null
        this._ref = null
        this.state = {
            currentTextIdx: 0,
            currentCharPos: 0,
            isDeleting: false,
        }
    }

    componentDidMount() {
        this._queueTick(TICK_INIT)
    }

    componentWillUnmount() {
        clearTimeout(this._ticker)
    }

    _queueTick(type) {
        const {
            writeSpeedMs,
            deleteSpeedMs,
            waitBeforeDeleteMs,
        } = this.props

        const timeout =
            type === TICK_INIT ? 0 :
            type === TICK_WRITE ? randomizeTimeout(writeSpeedMs) :
            type === TICK_DELETE ? randomizeTimeout(deleteSpeedMs) :
            type === START_DELETE ? waitBeforeDeleteMs :
            0 // ¯\_(ツ)_/¯

        this._ticker = setTimeout(this._tick, timeout)
    }

    _moveToNextText() {
        const {strings} = this.props
        const {currentTextIdx} = this.state
        const nextTextIdx = currentTextIdx + 1
        this.setState({
            isDeleting: false,
            currentTextIdx: nextTextIdx < strings.length ? nextTextIdx : 0,
            currentCharPos: 0,
        })
    }

    _tick = () => {
        const {strings} = this.props
        const {
            currentTextIdx,
            currentCharPos,
            isDeleting,
        } = this.state

        const currentText = strings[currentTextIdx]

        const nextCharPos = isDeleting
            ? currentCharPos - 1
            : currentCharPos + 1

        if (isDeleting) {
            if (nextCharPos < 0) {
                this._moveToNextText()
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
            }
            this._queueTick(TICK_DELETE)
        } else {
            if (nextCharPos > currentText.length) {
                this.setState({
                    isDeleting: true,
                })
                this._queueTick(START_DELETE)
            } else {
                this.setState({
                    currentCharPos: nextCharPos,
                })
                this._queueTick(TICK_WRITE)
            }
        }
    }

    render() {
        const {strings, component} = this.props
        const {
            currentTextIdx,
            currentCharPos,
        } = this.state

        const currentText = strings[currentTextIdx]
        const text = currentText.slice(0, currentCharPos)

        const componentProps = {
            ...getComponentProps(this.props),
            [this.props.stringPropName]: text,
        }

        const Component = component
        return (
            <Component ref={this._registerRef} {...componentProps} />
        )
    }
}

module.exports = Typewriting
