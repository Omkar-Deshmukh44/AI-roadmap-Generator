import React from 'react';
import { Link } from 'react-router-dom';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="text-xl mt-10 font-bold mb-4">Places to Visit</h2>

      {trip.itinerary && Object.keys(trip.itinerary).map((day, index) => (
        <div key={day}>
          <h3 className="text-lg font-bold mt-8 mb-4">{`Day ${index + 1}`}</h3>
          <div className="mt-7 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
            {trip.itinerary[day].map((place, idx) => {
              // Ensure placeName is a string or fallback to a default value
              const placeName = typeof place.placeName === 'string' ? place.placeName : 'Unknown Place';
              const placeDetails = typeof place.placeDetails === 'string' ? place.placeDetails : 'Details not available';
              const timeToSpend = typeof place.timeToSpend === 'string' ? place.timeToSpend : 'Time info not available';
              const ticketPricing = typeof place.ticketPricing === 'string' ? place.ticketPricing : 'Pricing info not available';
              const rating = place.rating || 'Rating not available';

              return (
                <Link
                  key={`${day}-${idx}`}
                  to={`https://www.google.com/maps/search/?api=1&query=${placeName},${place?.geoCoordinates?.latitude},${place?.geoCoordinates?.longitude}`}
                  target='_blank'
                >
                  <div className="hover:scale-110 cursor-pointer transition-all">
                    <img
                      src="https://images.pexels.com/photos/590029/pexels-photo-590029.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      className="rounded-xl"
                      alt="Place"
                    />
                    <div className="my-2 flex flex-col gap-3">
                      <h2 className="font-medium">{placeName}</h2>
                      <h2 className="text-xs text-gray-500">📍 {placeDetails}</h2>
                      <h2 className="text-sm">⏱ Time to Spend: {timeToSpend}</h2>
                      <h2 className="text-sm">💵 Ticket Pricing: {ticketPricing}</h2>
                      <h2 className="text-sm">⭐ {rating} stars</h2>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
