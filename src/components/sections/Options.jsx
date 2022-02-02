import React from 'react'
import Dropdown from '../Dropdown'
import { combos } from '../../combinations/fundamentals'


const rounds = [3, 4, 6, 8, 10, 12, 24, Infinity];
const restTimes = [30, 45, 60];
const roundTimes = [120, 180, 300];
const workoutRates = [5, 4, 3, 2];

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
        title: "Combo Rate",
        items: workoutRates,
        dropdownOption: "rate"
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
    }
]

const Options = () => {
    return (
        <div className="column is-12 is-8-desktop mx-auto ">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}
        </div>
    )
}

export default Options
