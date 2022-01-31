import React, { useContext } from 'react';
import { WorkoutContext } from "../context/WorkoutContext";
import { DropdownContext } from '../context/DropdownContext';

const Dropdown = ({ menuAttr }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;

    const genText = (dropdownOption, item) => {
        let rtnVal;
        console.log({ dropdownOption })
        if (dropdownOption === "totalRounds") {
            if (item === Infinity) rtnVal = "Unlimited"
            else rtnVal = item
        } else if (dropdownOption === "combos") {
            rtnVal = item.name
        } else if (dropdownOption === "rate") {
            console.log("hello")
            if (item === 5) rtnVal = "Easy"
            else if (item === 4) rtnVal = "Amateur"
            else if (item === 3) rtnVal = "Pro"
            else if (item === 2) rtnVal = "Legend"
            else rtnVal = item
        } else {
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
        else return timer.convertToTime(workout[dropdownOption])
    }

    return (
        <div className={`dropdown mb-4 px-6 ${dropdown[dropdownOption] ? "is-active" : ""}`}>
            <div className="dropdown-trigger" onClick={handleClick}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu ">
                    <span className=" has-font-8bit small-text">{title}: {genTitle()} </span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu px-6" id="dropdown-menu" role="menu">
                <div className="dropdown-content">

                    {items.map(item => <a onClick={() => workoutFns.changeOptions(dropdownOption, item)} key={`${item}-dropdown-${title}-${Math.random() * 9999999999}`} href="#" className="dropdown-item  has-font-8bit ">
                        {genText(dropdownOption, item)}
                    </a>)}

                </div>
            </div>
        </div>
    )
}

export default Dropdown
