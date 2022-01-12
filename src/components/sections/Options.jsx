import React from 'react'
import Dropdown from '../Dropdown'

const Options = ({ dropdowns }) => {
    return (
        <div className="column p-6 is-6">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}
        </div>
    )
}

export default Options
