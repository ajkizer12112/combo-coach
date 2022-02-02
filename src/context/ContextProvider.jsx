import React, { useMemo } from 'react';
import useAccount from '../hooks/useAccount';
import useWorkout from '../hooks/useWorkout';
import useDropdown from '../hooks/useDropdown';

import { AccountContext } from './AccountContext';
import { WorkoutContext } from './WorkoutContext';
import { DropdownContext } from './DropdownContext';

const ContextProvider = (props) => {
    const { workout, workoutActions } = useWorkout();
    const { dropdown, dropdownActions } = useDropdown();
    const { account, authenticationFns, profileFns, userStats } = useAccount();

    const workoutValue = useMemo(() => ({ workout, workoutActions, profileFns }), [workout, workoutActions, profileFns])
    const dropdownValue = useMemo(() => ({ dropdown, dropdownActions }), [dropdown, dropdownActions])
    const accountValue = useMemo(() => ({ account, authenticationFns, profileFns, userStats }), [account, authenticationFns, profileFns, userStats])

    return (
        <AccountContext.Provider value={accountValue}>
            < WorkoutContext.Provider value={workoutValue} >
                <DropdownContext.Provider value={dropdownValue}>
                    {props.children}
                </DropdownContext.Provider>
            </WorkoutContext.Provider >
        </AccountContext.Provider>
    )

};

export default ContextProvider;
