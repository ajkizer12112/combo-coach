import React, { useContext, useState, useEffect } from 'react';
import { AccountContext } from '../../context/AccountContext';

const UserInfo = () => {
    const { account, userStats } = useContext(AccountContext)


    const createString = (valArr, name) => {
        let string;
        if (valArr[1] === "b") {
            string = `${name} Body`
        } else {
            string = `${name} Head`
        }

        return string
    }

    const offenseTextArr = Object.keys(userStats.maneuverTracker).map(key => {
        let maneuver;

        const valArr = key.split("")
        const nonNumbers = ["Pull", "Duck", "Roll", "Slip"]

        if (nonNumbers.includes(key)) return
        else if (valArr[0] === "1") maneuver = createString(valArr, "Jab")
        else if (valArr[0] === "2") maneuver = createString(valArr, "Rear Straight")
        else if (valArr[0] === "3") maneuver = createString(valArr, "Lead Hook")
        else if (valArr[0] === "4") maneuver = createString(valArr, "Rear Hook")
        else if (valArr[0] === "5") maneuver = createString(valArr, "Lead Uppercut")
        else if (valArr[0] === "6") maneuver = createString(valArr, "Rear Uppercut")
        else maneuver = key

        return `${maneuver}: ${userStats.maneuverTracker[key]}`
    });


    const defenseTextArr = ["Pull", "Duck", "Roll", "Slip"].map(item => {
        return `${item}: ${userStats.maneuverTracker[item]}`
    })

    return (
        <div>
            <p>{account.currentUser.username}</p>
            <p>Lifetime Rounds Completed: {userStats.roundsCompleted}</p>

            {offenseTextArr.sort().map(item => <p key={Math.random() * 999999999999 + item}>{item}</p>)}
            {defenseTextArr.map(item => <p key={Math.random() * 999999999999 + item}>{item}</p>)}
        </div>
    )
};

export default UserInfo;
