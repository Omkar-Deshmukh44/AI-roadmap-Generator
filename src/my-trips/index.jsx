import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import Card from './components/Card';

function AllRoadmaps() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllRoadmaps();
  }, []);

  const fetchAllRoadmaps = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'AIRoadmaps'));
      const allRoadmaps = querySnapshot.docs.map(doc => ({
        id: doc.id,  // Include Firestore document ID
        ...doc.data()
      }));

      setRoadmaps(allRoadmaps);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 mt-10">
      <h2 className="font-bold text-3xl text-gray-800 text-center">My Roadmaps</h2>

      {loading ? (
        <p className="text-center text-gray-600 mt-5">Loading roadmaps...</p>
      ) : roadmaps.length === 0 ? (
        <p className="text-center text-gray-600 mt-5">No roadmaps available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.id} roadmap={roadmap} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllRoadmaps;
