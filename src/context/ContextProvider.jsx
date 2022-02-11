import React, { useMemo } from 'react';
import useAccount from '../hooks/useAccount';
import useWorkout from '../hooks/useWorkout';
import useDropdown from '../hooks/useDropdown';
import useModal from '../hooks/useModal'

import { AccountContext } from './AccountContext';
import { WorkoutContext } from './WorkoutContext';
import { DropdownContext } from './DropdownContext';
import { ModalContext } from './ModalContext'

const ContextProvider = (props) => {
    const { workout, workoutActions } = useWorkout();
    const { dropdown, dropdownActions } = useDropdown();
    const { account, authenticationFns, profileFns, userStats } = useAccount();
    const { modals, modalActions } = useModal();

    const workoutValue = useMemo(() => ({ workout, workoutActions, profileFns }), [workout, workoutActions, profileFns])
    const dropdownValue = useMemo(() => ({ dropdown, dropdownActions }), [dropdown, dropdownActions])
    const accountValue = useMemo(() => ({ account, authenticationFns, profileFns, userStats }), [account, authenticationFns, profileFns, userStats])
    const modalValue = useMemo(() => ({ modals, modalActions }), [modals, modalActions])

    return (
        <AccountContext.Provider value={accountValue}>
            < WorkoutContext.Provider value={workoutValue} >
                <DropdownContext.Provider value={dropdownValue}>
                    <ModalContext.Provider value={modalValue}>
                        {props.children}
                    </ModalContext.Provider>
                </DropdownContext.Provider>
            </WorkoutContext.Provider >
        </AccountContext.Provider>
    )

};

export default ContextProvider;
