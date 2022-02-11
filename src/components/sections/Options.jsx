import React from 'react'
import Dropdown from '../inputs/Dropdown'
import { combos } from '../../combinations/fundamentals'


const rounds = [1, 3, 4, 6, 8, 10, 12, 24];
const restTimes = [30, 45, 60];
const roundTimes = [120, 180, 300];
const workoutRates = [8, 6, 5, 4];
const followupRates = [30, 40, 55, 70];

const dropdowns = [
    {
        title: "Number of Rounds",
        items: rounds,
        dropdownOption: "totalRounds"
    },
    {
        title: "Rest",
        items: restTimes,
        dropdownOption: "restTime"
    },
    {
        title: "Round Time",
        items: roundTimes,
        dropdownOption: "roundTime"
    },
    {
        title: "Combos",
        items: combos,
        dropdownOption: "combos"
    },
    {
        title: "Combo Rate",
        items: workoutRates,
        dropdownOption: "rate"
    },
    {
        title: "Followup Frequency",
        items: followupRates,
        dropdownOption: "followupChance"
    },
]

const Options = () => {
    return (
        <div className="column is-12 is-8-desktop mx-auto ">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}
        </div>
    )
}

export default Options
