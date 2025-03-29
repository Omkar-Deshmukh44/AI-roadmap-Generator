import React from 'react';
import { Link } from 'react-router-dom';

function Card({ roadmap }) {
    return (
        <Link to={`/view-roadmap/${roadmap?.id}`}>
            <div className="hover:scale-105 hover:opacity-80 transition-all mt-4 bg-white shadow-lg rounded-xl overflow-hidden">
                <img 
                    className="w-full h-40 object-cover" 
                    src={roadmap?.imageURL || 'https://img.freepik.com/free-vector/four-step-road-map-infographic-template-with-colorful-location-pointer_1017-54337.jpg?t=st=1743244571~exp=1743248171~hmac=db46ac680a08ace6c31386ed8c9381278cfbc07296185255f94f6ffc5c73c444&w=1480'} 
                    alt={roadmap?.userSelection?.exam || "Exam Roadmap"}
                />
                <div className="p-4">
                    <h2 className="font-bold text-lg text-gray-800">{roadmap?.userSelection?.exam}</h2>
                    <p className="text-sm text-gray-600">For {roadmap?.userSelection?.monthsLeft} months of preparation</p>
                </div>
            </div>
        </Link>
    );
}

export default Card;
