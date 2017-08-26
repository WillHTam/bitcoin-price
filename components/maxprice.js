import { LinePath } from '@vx/shape'

export default ({ data, label, yText, yScale, xScale, x, y}) => {
    return (
        <g>
            <LinePath data={data} yScale={yScale} xScale={xScale} x={x} y={y} />
            <text y={yText} fontSize="12">
                {label}
            </text>
        </g>
    )
}
