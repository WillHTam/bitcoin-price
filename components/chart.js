import Head from 'next/head'
import {withParentSize} from '@vx/responsive'
import { scaleTime, scaleLinear } from '@vx/scale'
import { LinePath, AreaClosed, Bar } from '@vx/shape'
import { LinearGradient } from '@vx/gradient'
import { AxisBottom } from '@vx/axis'
import { withTooltip, Tooltip } from '@vx/tooltip'

import formatPrice from "../utils/formatPrice"
import MaxPrice from './maxprice'
import MinPrice from './minprice'

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

    const firstPoint = data[0]
    const currentPoint = data[data.length - 1]
    
    const minPrice = Math.min(...data.map(y))
    const maxPrice = Math.max(...data.map(y))
    const maxPriceData = [
        { time: x(firstPoint), price: maxPrice }, 
        { time: x(currentPoint), price: maxPrice }
    ]
    const minPriceData = [
        { time: x(firstPoint), price: minPrice}, 
        { time: x(currentPoint), price: minPrice}
    ]
    console.log('maxPriceData' + maxPriceData)

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
        <Head>
          <title>Coin Prices</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <svg width={width} height={parentHeight}>
          <AxisBottom top={yScale(minPrice)} data={data} scale={xScale} x={x} numTicks={5} tickLabelComponent={<text fill="#ffffff" fontSize={11} textAnchor="middle" />} hideAxisLine hideTicks />
          <LinearGradient id="area-fill" from="#4682b4" to="#4682b4" fromOpacity={0.3} toOpacity={0} />
          <MaxPrice data={maxPriceData} yScale={yScale} xScale={xScale} x={x} y={y} label={formatPrice(maxPrice)} yText={yScale(maxPrice)} />
          <MinPrice data={minPriceData} yScale={yScale} xScale={xScale} x={x} y={y} label={formatPrice(minPrice)} yText={yScale(minPrice)} />
          <AreaClosed data={data} yScale={yScale} xScale={xScale} x={x} y={y} fill="url(#area-fill)" stroke="transparent" />
          <LinePath data={data} yScale={yScale} xScale={xScale} x={x} y={y} />
          <Bar width={width} height={height} fill="transparent" />
        </svg>
      </div>;
}

export default withParentSize(Chart)