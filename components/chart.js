import {withParentSize} from '@vx/responsive'
import { scaleTime, scaleLinear } from '@vx/scale'
import { LinePath } from '@vx/shape'

function Chart({ data, parentWidth, parentHeight }) {
    const margin = {
        top: 15,
        bottom: 40,
        left: 0,
        right: 0
    }
    const width = parentWidth - margin.left - margin.right
    const height = parentHeight - margin.top - margin.bottom

    const x = d => new Date(d.time)
    const y = d => d.price
    const minPrice = Math.min(...data.map(y))
    const maxPrice = Math.max(...data.map(y))

    const xScale = scaleTime({
        range: [0, width],
        domain: [Math.min(...data.map(x)), Math.max(...data.map(x))]
    })
    console.log('X axis domain: ' + xScale.domain())

    const yScale = scaleLinear({
        // Y increases as you go down so need to remap with range
        range: [height, 0],
        domain: [minPrice, maxPrice]
    })
    console.log('Y axis domain: ' + yScale.domain())

    return <div>
        <svg width={width} height={height}>
            <LinePath data={data} yScale={yScale} xScale={xScale} x={x} y={y} />
        </svg>
      </div>
}

export default withParentSize(Chart)