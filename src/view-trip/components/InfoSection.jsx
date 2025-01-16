import React, { useEffect, useState } from 'react';
import { FaShareAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {
  const [placePhoto, setPlacePhoto] = useState(null);  // Track photo state

  // Ensure trip data is valid before rendering
  if (!trip || !trip.trip) {
    return <div>Loading trip details...</div>;
  }

  const { location, duration, budget, travelers } = trip.trip;

  return (
    <div>
      {/* Conditional rendering for the photo */}
      <img 
        src={placePhoto || "https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?t=st=1736848835~exp=1736852435~hmac=c0e19bd69f3f2e15b9f3ebaf3e3fa0fa20a06d33229c7b7a2568b92e78f116e3&w=1060"}
        alt="Travel destination"
        className="h-[360px] w-full object-cover rounded-xl flex flex-between"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{location}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-sm">📅 {duration}</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-sm">💰 {budget} Budget</h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-600 text-sm">🍻 {travelers} People</h2>
          </div>
        </div>
        <div>
          <Button className="bg-[#540D6E] text-white h-12 text-xl hover:bg-[#CFBCDF] rounded-[50%] hover:scale-110 transition-all duration-300">
            <FaShareAlt />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
