import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';

const UserInfo = () => {
    const { userStats } = useContext(AccountContext)

    if (userStats.loading) return <>loading</>


    const offensiveKeys = ["1", "2", "3", "4", "5", '6']


    const offenseData = offensiveKeys.map(key => {
        let name;
        if (key === "1") name = "Jab";
        else if (key === "2") name = "Rear Straight";
        else if (key === "3") name = "Lead Hook";
        else if (key === "4") name = "Rear Hook";
        else if (key === "5") name = "Lead Uppercut";
        else if (key === "6") name = "Rear Uppercut";
        else name = key

        const body = userStats.maneuverTracker[key + "b"] || 0
        const head = userStats.maneuverTracker[key] || 0

        return { name, body, head }
    })


    const defenseKeys = ["Slip", "Pull", "Roll", "Duck"]

    const defenseData = defenseKeys.map(key => {
        return { name: key, count: userStats.maneuverTracker[key] || 0 }
    })

    return (
        <div className="has-background-white columns is-multiline">
            <div className="column is-12">
                <p>Lifetime Rounds Completed: {userStats.roundsCompleted}</p>
            </div>
            <div className="column is-12">
                <h3 className="is-size-4">Striking Breakdown</h3>
                <BarChart
                    width={1000}
                    height={300}
                    data={offenseData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="body" fill="#8884d8" />
                    <Bar dataKey="head" fill="#82ca9d" />
                </BarChart>
            </div>
            <div className="column is-12">
                <h3 className="is-size-4">Defense Breakdown</h3>
                <BarChart
                    width={500}
                    height={300}
                    data={defenseData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />

                </BarChart>
            </div>
            <div className="column is-12">
                <h3 className="is-size-4">Rounds This Week: {userStats.completedWorkouts.map(item => item.rounds).reduce((a, b) => a + b, 0)} </h3>
            </div>
        </div>
    )
};

export default UserInfo;