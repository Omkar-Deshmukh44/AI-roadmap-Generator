import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='bg-[url()]'>
      <div className="flex flex-col items-center mx-56 gap-9 ">
        <h1 className="font-extrabold text-center mt-16" >
          <span className='text-[#540D6E] text-[50px]'>Plan the Perfect Getaway with AI Precision:</span>
          <h1 className='text-[30px]'>Seamless itineraries, personalized recommendations, and stress-free travel</h1>
        </h1>
        <Link to={'/create-trip'}>
          <Button className="bg-[#540D6E] text-white text-xl hover:bg-[#CFBCDF] rounded-full hover:scale-105 transition-all duration-300" >
            Get Started →
          </Button>
        </Link>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
      </div>
    </div>
  )
}

export default Hero