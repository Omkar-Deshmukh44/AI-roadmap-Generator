import React from 'react'
import { Link } from 'react-router-dom'

function Card({ trip }) {

    return (
        <Link to = {'/view-trip/'+trip?.id}>
            <div className='hover:scale-105 hover:opacity-[70%] transition-all mt-4'>
                <img className="object-cover rounded-xl" src='https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-600'>{trip?.userSelection?.noOfDays} Days of trip with {trip?.userSelection?.budget} budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default Card