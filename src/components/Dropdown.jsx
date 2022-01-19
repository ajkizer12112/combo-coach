import React, { useContext } from 'react';
import { WorkoutContext } from "../context/WorkoutContext";
import { DropdownContext } from '../context/DropdownContext';

const Dropdown = ({ menuAttr }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;


    const nonTimeSelections = ["totalRounds", "combos"]

    const genText = (dropdownOption, item) => {
        let rtnVal;
        if (dropdownOption === "totalRounds") {
            if (item === Infinity) {
                rtnVal = "Unlimited"
            } else {
                rtnVal = item
            }
        } else if (dropdownOption === "combos") {
            rtnVal = item.name
        } else {
            rtnVal = timer.convertToTime(item)
        }

        return rtnVal
    }

    return (
        <div className={`dropdown mb-4 mx-3 ${dropdown[dropdownOption] ? "is-active" : ""}`}>
            <div className="dropdown-trigger" onClick={() => dropdownActions.toggle(dropdownOption, true)}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{title}: {dropdownOption === "totalRounds" ? workout[dropdownOption] : dropdownOption === "combos" ? workout.combos.name : timer.convertToTime(workout[dropdownOption])}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">

                    {items.map(item => <a onClick={() => workoutFns.changeOptions(dropdownOption, item)} key={`${item}-dropdown-${title}-${Math.random() * 1000}`} href="#" className="dropdown-item">
                        {genText(dropdownOption, item)}
                    </a>)}

                </div>
            </div>
        </div>
    )
}

export default Dropdown
