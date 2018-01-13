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

class Typewriting extends PureComponent {

    static propTypes = {
        strings: PropTypes.array.isRequired,
        stringPropName: PropTypes.string,
        waitBeforeDeleteMs: PropTypes.number,
        writeSpeedMs: PropTypes.number,
        deleteSpeedMs: PropTypes.number,
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
            componentProps: getComponentProps(props),
        }
    }

    componentDidMount() {
        this._queueTick(TICK_INIT)
    }

    componentWillUnmount() {
        clearTimeout(this._ticker)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            componentProps: getComponentProps(nextProps),
        })
    }

    _randomizeTimeout(ms) {
        // TODO: probably should implement a minimum timeout
        return Math.random() * ms
    }

    _queueTick(type) {
        const {
            writeSpeedMs,
            deleteSpeedMs,
            waitBeforeDeleteMs,
        } = this.props

        const timeout =
            type === TICK_INIT ? 0 :
            type === TICK_WRITE ? this._randomizeTimeout(writeSpeedMs) :
            type === TICK_DELETE ? this._randomizeTimeout(deleteSpeedMs) :
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
            componentProps,
        } = this.state

        const currentText = strings[currentTextIdx]
        const text = currentText.slice(0, currentCharPos)

        const _componentProps = {
            ...componentProps,
            [this.props.stringPropName]: text,
        }

        const Component = component
        return (
            <Component ref={this._registerRef} {..._componentProps} />
        )
    }
}

module.exports = Typewriting
