import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import Card from './components/Card';

function MyTrips() {
  const navigate = useNavigate(); 
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/'); // Navigate to home if the user is not found
      return;
    }
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    const trips = [];
    querySnapshot.forEach((doc) => {
      // Collect trip data
      trips.push(doc.data());
    });
    setUserTrips(trips); // Update the state with all trips at once
  };

  return (
    <div className="max-w-3xl mx-auto px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
        {userTrips.map((trip, index) => (
          <Card key={index} trip={trip} /> // Return the Card component for each trip
        ))}
      </div>
    </div>
  );
}

export default MyTrips;
