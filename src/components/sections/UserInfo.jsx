import React, { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { BarChart, XAxis, YAxis, CartesianGrid, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';

const UserInfo = () => {
    const { userStats } = useContext(AccountContext)

    console.log(userStats);

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


    return (
        <div className="has-background-white">
            <p></p>
            <p>Lifetime Rounds Completed: {userStats.roundsCompleted}</p>

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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="body" fill="#8884d8" />
                <Bar dataKey="head" fill="#82ca9d" />
            </BarChart>

        </div>
    )
};

export default UserInfo;