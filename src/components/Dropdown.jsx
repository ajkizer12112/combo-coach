import React, { useContext } from 'react';
import { WorkoutContext } from "../context/WorkoutContext";
import { DropdownContext } from '../context/DropdownContext';

const Dropdown = ({ menuAttr }) => {
    const { workout, workoutActions: { timer, workoutFns } } = useContext(WorkoutContext);
    const { dropdown, dropdownActions } = useContext(DropdownContext);
    const { title, items, dropdownOption } = menuAttr;

    return (
        <div className={`dropdown column is-6 ${dropdown[dropdownOption] ? "is-active" : ""}`}>
            <div className="dropdown-trigger" onClick={() => dropdownActions.toggle(dropdownOption, true)}>
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{title}: {dropdownOption === "totalRounds" ? workout[dropdownOption] : timer.convertToTime(workout[dropdownOption])}</span>
                    <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">

                    {items.map(item => <a onClick={() => workoutFns.changeOptions(dropdownOption, item)} key={`${item}-dropdown-${title}`} href="#" className="dropdown-item">
                        {dropdownOption === "totalRounds" ? item === Infinity ? "Unlimited" : item : timer.convertToTime(item)}
                    </a>)}

                </div>
            </div>
        </div>
    )
}

export default Dropdown
