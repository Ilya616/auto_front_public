import React from 'react'

export default function DefaultLayout(props) {
  return (
    <div>

        <h1>DefaultLayout</h1>


        {props.children}


        <p>конец шаблона</p>
    </div>
  )
}
