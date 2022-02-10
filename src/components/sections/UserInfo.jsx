import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../context/AccountContext';

const UserInfo = () => {
    const { account, userStats } = useContext(AccountContext)

    console.log(userStats);


    const createString = (valArr, name) => {
        let string;
        if (valArr[1] === "b") {
            string = `${name} Body`
        } else {
            string = `${name} Head`
        }

        return string
    }

    const offensiveKeys = ["1", "1b", "2", "2b", "3", "3b", "4", "4b", "5", "5b", '6', "6b", "Pull", "Slip", "Duck", "Roll"]


    const offenseTextArr = offensiveKeys.map(key => {
        let maneuver;


        const valArr = key.split("")
        if (valArr[0] === "1") maneuver = createString(valArr, "Jab")
        else if (valArr[0] === "2") maneuver = createString(valArr, "Rear Straight")
        else if (valArr[0] === "3") maneuver = createString(valArr, "Lead Hook")
        else if (valArr[0] === "4") maneuver = createString(valArr, "Rear Hook")
        else if (valArr[0] === "5") maneuver = createString(valArr, "Lead Uppercut")
        else if (valArr[0] === "6") maneuver = createString(valArr, "Rear Uppercut")
        else maneuver = key


        const numText = userStats.maneuverTracker[key] ? userStats.maneuverTracker[key] : "0"

        return `${maneuver}: ${numText}`
    });



    return (
        <div>
            <p></p>
            <p>Lifetime Rounds Completed: {userStats.roundsCompleted}</p>

            {offenseTextArr.map(item => <p key={(Math.random() * 999999999999).toString() + item}>{item}</p>)}

        </div>
    )
};

export default UserInfo;