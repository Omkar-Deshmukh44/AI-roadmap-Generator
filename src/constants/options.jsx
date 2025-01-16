export const SelectTravellerList = [
    {
        id: 1,
        title: 'Just me',
        desc: 'A sole travels in exploration',
        icon: '👤', // Add an appropriate icon
        people: '1',
    },
    {
        id: 2,
        title: 'Couple',
        desc: 'Perfect for a romantic getaway',
        icon: '💑', // Add an appropriate icon
        people: '2',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Ideal for family adventures',
        icon: '👨‍👩‍👧‍👦', // Add an appropriate icon
        people: '2+', // Adjust this based on your use case
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'Share memorable moments with your crew',
        icon: '🧑‍🤝‍🧑', // Add an appropriate icon
        people: '3+', // Can vary depending on group size
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay conscious of costs and travel economically',
        icon: '💸', // Add a relevant emoji or icon
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Balance comfort and affordability during your trip',
        icon: '💰', // Add a relevant emoji or icon
    },
    {
        id: 3,
        title: 'High',
        desc: 'Experience luxury and premium travel options',
        icon: '🤑', // Add a relevant emoji or icon
    },
];

export const AI_PROMPT = 'Generate Travel Plan for Location:{location}, for {totalDays} days for {traveler} with {budget} budget Give me a Hotels options list with HotelName , Hotel adress, Price, hotel image url, geo coordinates, rating , descriptions, and suggest itinerary with placeName ,Place Details, Place Image Url , Geo Coordinates, ticket Pricing, rating, Time travel each of location for {totalDays} days with each day plan with best time to visit in proper JSON format so that i can access hotels and place name and details easily that is going to be stored in database just give JSON data nothing else'