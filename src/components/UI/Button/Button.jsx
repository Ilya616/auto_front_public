import React from 'react'

export default function Button(props) {
    return (
        <>
            <button 
                onClick={props.event} 
                className={props.className} 
            >
                {props.children}
            </button>
        </>
    )
}
