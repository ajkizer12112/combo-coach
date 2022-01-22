import React, { useContext } from 'react';
import { WorkoutContext } from "../context/WorkoutContext";
import { DropdownContext } from '../context/DropdownContext';

const Dropdown = ({ menuAttr }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;

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

    const handleClick = () => {
        if (!workout.inProgress) {
            dropdownActions.toggle(dropdownOption, true)
        }
    }

    return (
        <div className={`dropdown mb-4 px-6 ${dropdown[dropdownOption] ? "is-active" : ""}`}>
            <div className="dropdown-trigger" onClick={handleClick}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu ">
                    <span className=" has-font-8bit small-text">{title}: {dropdownOption === "totalRounds" ? workout[dropdownOption] : dropdownOption === "combos" ? workout.combos.name : timer.convertToTime(workout[dropdownOption])}</span>
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
