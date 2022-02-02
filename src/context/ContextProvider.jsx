import React, { useMemo } from 'react';
import useAuth from '../hooks/useAuth';
import useWorkout from '../hooks/useWorkout';
import useDropdown from '../hooks/useDropdown';

import { AuthContext } from './AuthContext';
import { WorkoutContext } from './WorkoutContext';
import { DropdownContext } from './DropdownContext';

const ContextProvider = (props) => {
    const { workout, workoutActions } = useWorkout();
    const { dropdown, dropdownActions } = useDropdown();
    const { auth, login, logout } = useAuth();

    const workoutValue = useMemo(() => ({ workout, workoutActions }), [workout, workoutActions])
    const dropdownValue = useMemo(() => ({ dropdown, dropdownActions }), [dropdown, dropdownActions])
    const authValue = useMemo(() => ({ auth, login, logout }), [auth, login, logout])

    return (
        <AuthContext.Provider value={authValue}>
            < WorkoutContext.Provider value={workoutValue} >
                <DropdownContext.Provider value={dropdownValue}>
                    {props.children}
                </DropdownContext.Provider>
            </WorkoutContext.Provider >
        </AuthContext.Provider>
    )

};

export default ContextProvider;
