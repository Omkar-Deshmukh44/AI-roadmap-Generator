import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';

function RoadmapView() {
    const { tripId } = useParams();
    const [roadmap, setRoadmap] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ FIXED: Defined loading state

    useEffect(() => {
        if (tripId) {
            fetchRoadmap();
        }
    }, [tripId]);

    const fetchRoadmap = async () => {
        try {
            console.log("Fetching roadmap for ID:", tripId);
            const docRef = doc(db, 'AIRoadmaps', tripId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Fetched Data (Raw):", docSnap.data());
                const data = docSnap.data();

                if (data.roadmapData) {
                    try {
                        const parsedData = JSON.parse(data.roadmapData);
                        console.log("Parsed Data:", parsedData);
                        setRoadmap(parsedData);
                    } catch (error) {
                        console.error("Error parsing JSON:", error);
                        toast.error("Failed to parse roadmap details.");
                    }
                } else {
                    console.error("roadmapData field missing in document");
                    toast.error("No Roadmap Data Found");
                }
            } else {
                console.log("No Such Document");
                toast.error("No Roadmap Found");
            }
        } catch (error) {
            console.error("Firestore Error:", error);
            toast.error("Error fetching roadmap.");
        } finally {
            setLoading(false); // ✅ FIXED: Ensure loading is set to false
        }
    };

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56 bg-gray-100 min-h-screen'>
            {loading ? (
                <div className='text-center text-lg font-semibold text-gray-600'>Loading roadmap...</div>
            ) : roadmap ? (
                <div className='bg-white p-6 rounded-lg shadow-lg'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-4'>{roadmap.exam} Roadmap</h1>
                    <p className='text-lg text-gray-600 mb-6 mt-[30px]'><span className='font-semibold'>📅 {roadmap.months} months</span></p>
                    
                    <h2 className='text-xl font-semibold text-gray-700 mb-4 mt-[30px]'>Resources:</h2>
                    <div className='mt-7 grid grid-cols-2 md:grid-cols-3  gap-10'>
                        {roadmap.resources.map((res, index) => (
                            <a key={index} href={res.url} target="_blank" rel="noopener noreferrer" className="hover:scale-110 cursor-pointer transition-all">
                                <img
                                src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp"
                                alt="Hotel"
                                className="rounded-xl"
                            />
                                <strong className='text-lg text-gray-800'>{res.title}</strong>
                                <p className='text-gray-600'>{res.platform} ({res.type})</p>
                            </a>
                        ))}
                    </div>
                    
                    <h2 className='text-xl font-semibold text-gray-700 mt-6 mb-2'>Weekly Plan:</h2>
                    <ul className='space-y-4'>
                        {roadmap.weekly_plan.map((week, index) => (
                            <li key={index} className='p-4 bg-gray-50 border-l-4 border-blue-500 rounded-md'>
                                <strong className='text-gray-800'>Week {week.week_number}:</strong>
                                <p className='text-gray-600'>{week.topics.join(', ')}</p>
                                <ul className='list-disc list-inside mt-2 pl-4'>
                                    {week.tasks.map((task, i) => <li key={i} className='text-gray-600'>{task}</li>)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='text-center text-lg font-semibold text-gray-600'>No roadmap found.</div>
            )}
        </div>
    );
}

export default RoadmapView;
