import React, { useState } from 'react'

const useDropdown = () => {
    const [dropdown, setDropdown] = useState({
        showRound: false
    })


    const dropdownActions = {
        toggle: function (option, value) {
            setDropdown({ ...dropdown, [option]: value })
        }
    }

    return { dropdown, dropdownActions }

}

export default useDropdown
