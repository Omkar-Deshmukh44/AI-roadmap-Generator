import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import { db } from '@/service/firebaseConfig';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null); // Initialize as null instead of empty array

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Fetched Data (Raw):", docSnap.data());
      const data = docSnap.data();

      // Parse the JSON data only if it exists
      try {
        const parsedData = JSON.parse(data.tripData);
        console.log("Parsed Data:", parsedData);
        setTrip(parsedData); // Update state with parsed data
      } catch (error) {
        console.error("Error parsing JSON:", error);
        toast.error("Failed to load trip details.");
      }
    } else {
      console.log("No Such Document");
      toast.error('No trip found!');
    }
  };

  return (
    <div className='pd-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Pass the `trip` state to components */}
      {trip ? (
        <>
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <PlacesToVisit trip={trip} />
        </>
      ) : (
        <div>Loading trip...</div>
      )}
    </div>
  );
}

export default Viewtrip;
