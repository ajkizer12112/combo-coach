import React, { useContext } from 'react';
import { WorkoutContext } from "../../context/WorkoutContext";
import { DropdownContext } from '../../context/DropdownContext';

const Dropdown = ({ menuAttr }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;

    const genText = (dropdownOption, item) => {
        let rtnVal;

        if (dropdownOption === "totalRounds") {
            if (item === Infinity) rtnVal = "Unlimited"
            else rtnVal = item
        } else if (dropdownOption === "combos") {
            rtnVal = item.name
        } else if (dropdownOption === "rate") {
            if (item === 8) rtnVal = "Easy"
            else if (item === 6) rtnVal = "Amateur"
            else if (item === 5) rtnVal = "Pro"
            else if (item === 4) rtnVal = "Legend"
            else rtnVal = item
        } else if (dropdownOption === "followupChance") {
            if (item === 30) rtnVal = "Easy"
            else if (item === 40) rtnVal = "Amateur"
            else if (item === 55) rtnVal = "Pro"
            else if (item === 70) rtnVal = "Legend"
        }

        else {
            rtnVal = timer.convertToTime(item)
        }

        return rtnVal
    }

    const handleClick = () => {
        if (!workout.inProgress) {
            dropdownActions.toggle(dropdownOption, true)
        }
    }

    const genTitle = () => {
        if (dropdownOption === "totalRounds") { return workout[dropdownOption] === Infinity ? "Unlimited" : workout[dropdownOption] }
        else if (dropdownOption === "combos") return workout.combos.name
        else if (dropdownOption === "rate") return genText("rate", workout.rate)
        else if (dropdownOption === "followupChance") return genText("followupChance", workout.followupChance)
        else return timer.convertToTime(workout[dropdownOption])
    }

    return (
        <>
            {dropdownOption === "totalRounds" && <p className="mt-6 mb-2 has-font-8bit has-text-centered">WORKOUT SETTINGS</p>}
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

                        {items.map(item => <a href="*" onClick={() => workoutFns.changeOptions(dropdownOption, item)} key={`${item}-dropdown-${title}-${Math.random() * 9999999999}`} className="dropdown-item  has-font-8bit ">
                            {genText(dropdownOption, item)}
                        </a>)}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dropdown
