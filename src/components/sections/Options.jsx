import React from 'react'
import Dropdown from '../Dropdown'

const Options = ({ dropdowns }) => {
    return (
        <div className="column is-4 pl-6 is-12-mobile">
            {dropdowns.map((item) => <Dropdown key={item.title} menuAttr={item} />)}
        </div>
    )
}

export default Options
