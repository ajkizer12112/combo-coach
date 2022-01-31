import React from 'react'

const CardWrapper = (props) => {
    return (
        <div className="card">
            <div className="card-body p-4">
                {props.children}
            </div>
        </div>
    )
}

export default CardWrapper