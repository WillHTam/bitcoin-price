import { withScreenSize } from '@vx/responsive'

function Background({width, height}) {
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
        const { screenWidth, screenHeight } = this.props
        const { data } = this.state
        return (
            <div>
                <Background width={screenWidth} height={screenHeight} />
                <style jsx>{`
                    .app {
                        display: flex;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0; 
                    }
                `}</style>
            </div>
        )
    }
}

export default withScreenSize(App)