import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const CompleteBarGraph = ({ data, xAxis, title, barProps, width = 1000, height = 300 }) => {
    return (
        <>
            <h3 className="is-size-3">{title}</h3>
            <BarChart
                width={width}
                height={height}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxis} />
                <YAxis />
                <Tooltip />
                <Legend />
                {barProps.map(prop => <Bar dataKey={prop.name} fill={prop.fill} />)}
            </BarChart>
        </>
    )
}

export default CompleteBarGraph