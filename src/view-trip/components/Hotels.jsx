import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  if (!trip || !trip.hotels) {
    return <div>Loading hotels...</div>;
  }

  if (trip.hotels.length === 0) {
    return <div>No hotels available for this trip.</div>;
  }

  return (
    <div>
      <h2 className="text-xl mt-10 font-bold mb-4">Recommended Hotels</h2>
      <div className="mt-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {trip.hotels.map((hotel, index) => (
          <Link
            key={hotel.hotelName + index} // Added key for uniqueness
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel?.hotelAddress}`}
            target="_blank"
          >
            <div className="hover:scale-110 cursor-pointer transition-all">
              <img
                src="https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Hotel"
                className="rounded-xl"
              />
              <div className="my-2 flex flex-col gap-3">
                <h2 className="font-medium">{hotel?.hotelName}</h2>
                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                <h2 className="text-sm">💲 {hotel?.price?.range || 'Price not available'}</h2>
                <h2 className="text-sm">⭐ {hotel?.rating || 'Rating not available'} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
