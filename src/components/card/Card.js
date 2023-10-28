import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'


const Card = ({ title ,navigatePage}) => {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        navigate(navigatePage)

    }
    return (
        <div className='card' onClick={handleSubmit}>
            <span className='cardTitle'>{title}</span>
        </div>
    )
}

export default Card