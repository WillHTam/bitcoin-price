function Background(width, height) {
    return (
        <svg width={width} height={height}>
            <rect 
                width={width}
                height={height}
                fill="steelblue"
            />
        </svg>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    render() {
        const { data } = this.state
        return (
            <div>
                <Background width={100} height={100} />
            </div>
        )
    }
}

export default App