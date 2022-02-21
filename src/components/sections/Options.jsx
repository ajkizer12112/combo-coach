import React from 'react'
import Dropdown from '../inputs/Dropdown'
import { combos } from '../../combinations/fundamentals'
import { OPTIONS_FIELD_NAMES, DIFFICULTY } from '../../utils/constants';

const { RATE_EASY, RATE_AMATEUR, RATE_PRO, RATE_LEGEND } = DIFFICULTY
const { FOLLOWUP_EASY, FOLLOWUP_AMATEUR, FOLLOWUP_PRO, FOLLOWUP_LEGEND } = DIFFICULTY
const { ROUND_TIME, TOTAL_ROUNDS, REST_TIME, RATE, FOLLOWUP_CHANCE, COMBOS } = OPTIONS_FIELD_NAMES

const rounds = [2, 3, 4, 6, 8, 10, 12, 24];
const restTimes = [30, 45, 60];
const roundTimes = [120, 180, 300];
const workoutRates = [RATE_EASY, RATE_AMATEUR, RATE_PRO, RATE_LEGEND];
const followupRates = [FOLLOWUP_EASY, FOLLOWUP_AMATEUR, FOLLOWUP_PRO, FOLLOWUP_LEGEND];

const dropdowns = [
    {
        title: "Number of Rounds",
        items: rounds,
        dropdownOption: TOTAL_ROUNDS
    },
    {
        title: "Rest",
        items: restTimes,
        dropdownOption: REST_TIME
    },
    {
        title: "Round Time",
        items: roundTimes,
        dropdownOption: ROUND_TIME
    },
    {
        title: "Combos",
        items: combos,
        dropdownOption: COMBOS
    },
    {
        title: "Combo Rate",
        items: workoutRates,
        dropdownOption: RATE
    },
    {
        title: "Followup Frequency",
        items: followupRates,
        dropdownOption: FOLLOWUP_CHANCE
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
