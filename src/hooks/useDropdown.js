import { useState } from 'react'


const initialState = {
    totalRounds: false,
    restTime: false,
    roundTime: false,
    countDown: false,
    roundWarningInterval: false,
}

const useDropdown = () => {
    const [dropdown, setDropdown] = useState({
        totalRounds: false,
        restTime: false,
        roundTime: false,
        countDown: false,
        roundWarningInterval: false,
    })

    const dropdownActions = {
        toggle: function (option, value) {
            setDropdown({ ...dropdown, [option]: value })
        },
        closeDropdowns: function () {
            const keys = Object.keys(dropdown);
            let hasOpen = false;
            keys.forEach(key => {
                if (dropdown[key]) {
                    hasOpen = true
                }
            })

            if (hasOpen) setDropdown(initialState)
        },
    }

    return { dropdown, dropdownActions }

}

export default useDropdown
