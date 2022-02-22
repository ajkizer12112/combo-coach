import React, { useContext } from 'react';
import { WorkoutContext } from "../../context/WorkoutContext";
import { DropdownContext } from '../../context/DropdownContext';
import { DIFFICULTY, OPTIONS_FIELD_NAMES } from '../../utils/constants'

const Dropdown = ({ menuAttr }) => {
    const { workout, timer, workoutFns } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;

    const { FOLLOWUP_EASY, FOLLOWUP_AMATEUR, FOLLOWUP_PRO, FOLLOWUP_LEGEND } = DIFFICULTY
    const { TEXT_EASY, TEXT_AMATEUR, TEXT_PRO, TEXT_LEGEND } = DIFFICULTY
    const { RATE_EASY, RATE_AMATEUR, RATE_PRO, RATE_LEGEND } = DIFFICULTY
    const { TOTAL_ROUNDS, COMBOS, RATE, FOLLOWUP_CHANCE } = OPTIONS_FIELD_NAMES

    const genText = (dropdownOption, selection) => {
        let rtnVal;

        if (dropdownOption === TOTAL_ROUNDS) {
            if (selection === Infinity) rtnVal = "Unlimited"
            else rtnVal = selection
        } else if (dropdownOption === COMBOS) {
            rtnVal = selection.name
        } else if (dropdownOption === RATE) {
            switch (selection) {
                case RATE_EASY:
                    rtnVal = TEXT_EASY
                    break;
                case RATE_AMATEUR:
                    rtnVal = TEXT_AMATEUR
                    break;
                case RATE_PRO:
                    rtnVal = TEXT_PRO
                    break;
                case RATE_LEGEND:
                    rtnVal = TEXT_LEGEND
                    break;
                default:
                    rtnVal = selection
                    break;
            }
        } else if (dropdownOption === FOLLOWUP_CHANCE) {
            switch (selection) {
                case FOLLOWUP_EASY:
                    rtnVal = TEXT_EASY
                    break;
                case FOLLOWUP_AMATEUR:
                    rtnVal = TEXT_AMATEUR
                    break;
                case FOLLOWUP_PRO:
                    rtnVal = TEXT_PRO
                    break;
                case FOLLOWUP_LEGEND:
                    rtnVal = TEXT_LEGEND
                    break;
                default:
                    rtnVal = selection
                    break;
            }

        } else {
            rtnVal = timer.convertToTime(selection)
        }

        return rtnVal
    }

    const handleClick = () => {
        if (!workout.inProgress) {
            dropdownActions.toggle(dropdownOption, true)
        }
    }

    const genTitle = () => {
        if (dropdownOption === TOTAL_ROUNDS) { return workout[dropdownOption] === Infinity ? "Unlimited" : workout[dropdownOption] }
        else if (dropdownOption === COMBOS) return workout.combos.name
        else if (dropdownOption === RATE) return genText(RATE, workout.rate)
        else if (dropdownOption === FOLLOWUP_CHANCE) return genText(FOLLOWUP_CHANCE, workout.followupChance)
        else return timer.convertToTime(workout[dropdownOption])
    }

    return (
        <>
            {dropdownOption === TOTAL_ROUNDS && <p className="mt-6 mb-2 has-font-8bit has-text-centered">WORKOUT SETTINGS</p>}
            {dropdownOption === "rate" && <p className="mt-6 mb-2 has-font-8bit has-text-centered">DIFFICULTY</p>}
            <div className={`dropdown mb-4 ${dropdown[dropdownOption] ? "is-active" : ""}`}>


                <div className={`dropdown-trigger`} onClick={handleClick}>
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu ">
                        <span className=" has-font-8bit small-text">{title}: {genTitle()} </span>
                        <span className="icon is-small">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">

                        {items.map(selection => <div onClick={() => workoutFns.changeOptions(dropdownOption, selection)} key={`${selection}-dropdown-${title}-${Math.random() * 9999999999}`} className="dropdown-item hover-pointer has-font-8bit ">
                            {genText(dropdownOption, selection)}
                        </div>)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropdown
