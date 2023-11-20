import React from 'react'


const Card = (props) => {

  const cardClass=`shadow-lg  border w-[80px] h-[80px] m-4 text-3xl font-bold cursor-pointer flex justify-center items-center rounded ${props.isActive ? "active" : "text-black"}`
  return (
    <div className={cardClass} onClick={props.onClick}>
        {props.number}
    </div>
  )
}

export default Card