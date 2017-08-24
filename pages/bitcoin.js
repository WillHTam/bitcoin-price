import { withScreenSize } from '@vx/responsive'
import { LinearGradient } from '@vx/gradient'

function Background({width, height}) {
    return (
        <svg width={width} height={height}>
            <LinearGradient id='fill' vertical={false}>
                <stop stopColor="#A943E4" offset="0%" />
                <stop stopColor="#F55989" offset="50%" />
                <stop stopColor="#FFAF84" offset="100%" />
            </LinearGradient>
            <rect 
                width={width}
                height={height}
                fill="url(#fill)"
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
            <div className="app">
                <Background width={screenWidth} height={screenHeight} />
                <div className="chartarea">
                    <div className="chart">
                        Hello I am here
                    </div>
                </div>
                <style jsx>{`
                    .app, .chartarea {
                        display: flex;
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0; 
                        justify-content: center;
                        align-items: center;
                        font-family: arial
                    }
                    .chart {
                        width: 600px;
                        height: 400px;
                        background-color:white;
                        border-radius: 8px;
                    }
                `}</style>
            </div>
        )
    }
}

export default withScreenSize(App)