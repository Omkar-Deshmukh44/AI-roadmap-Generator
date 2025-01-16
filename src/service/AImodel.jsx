import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};


  export const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate Travel Plan for Location:Las Vegas, for 3 days for Couple with Cheap budget Give me a Hotels options list with HotelName , Hotel adress, Price, hotel image url, geo coordinates, rating , descriptions, and suggest itinerary with placeName ,Place Details, Place Image Url , Geo Coordinates, ticket Pricing, rating, Time travel each of location for 3 days with each day plan with best time to visit in proper JSON format so that i can access hotels and place name and details easily that is going to be stored in database just give JSON data nothing else"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"trip\": {\n    \"location\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": {\"range\": \"50-100 USD/night (approx.)\"},\n      \"hotelImageUrl\": \"https://example.com/circuscircus.jpg\", \n      \"geoCoordinates\": {\"latitude\": 36.1215, \"longitude\": -115.1739},\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly option with a circus theme, featuring various attractions and a casino.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"300 Fremont St, Las Vegas, NV 89101\",\n      \"price\": {\"range\": \"60-120 USD/night (approx.)\"},\n      \"hotelImageUrl\": \"https://example.com/thed.jpg\",\n      \"geoCoordinates\": {\"latitude\": 36.1699, \"longitude\": -115.1401},\n      \"rating\": 4.0,\n      \"description\": \"Located in downtown Las Vegas, offering a more classic Vegas experience at a reasonable price.\"\n    },\n    {\n      \"hotelName\": \"Motel 6 Las Vegas-Airport\",\n      \"hotelAddress\": \"7575 S Las Vegas Blvd, Las Vegas, NV 89123\",\n      \"price\": {\"range\": \"40-80 USD/night (approx.)\"},\n      \"hotelImageUrl\": \"https://example.com/motel6.jpg\",\n      \"geoCoordinates\": {\"latitude\": 36.0400, \"longitude\": -115.1686},\n      \"rating\": 3.0,\n      \"description\": \"Basic, no-frills accommodation near the airport, ideal for budget travelers.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"A pedestrian mall with a vibrant atmosphere, light shows, and street performers.\",\n        \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.1695, \"longitude\": -115.1402},\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeToSpend\": \"3-4 hours\"\n      },\n      {\n        \"placeName\": \"Downtown Container Park\",\n        \"placeDetails\": \"An outdoor shopping and entertainment complex made from repurposed shipping containers.\",\n        \"placeImageUrl\": \"https://example.com/containerpark.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.1669, \"longitude\": -115.1388},\n        \"ticketPricing\": \"Free entry\",\n        \"rating\": 4.0,\n        \"timeToSpend\": \"2 hours\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Explore the iconic Las Vegas Strip, admiring the hotels and casinos.\",\n        \"placeImageUrl\": \"https://example.com/thestrip.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.1146, \"longitude\": -115.1729},\n        \"ticketPricing\": \"Free\",\n        \"rating\": 5.0,\n        \"timeToSpend\": \"4-5 hours\"\n      },\n      {\n        \"placeName\": \"Bellagio Fountains\",\n        \"placeDetails\": \"Watch the mesmerizing water show at the Bellagio.\",\n        \"placeImageUrl\": \"https://example.com/bellagiofountains.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.1113, \"longitude\": -115.1733},\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.8,\n        \"timeToSpend\": \"1 hour\"\n      },\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Public art installation consisting of colorful stacked boulders.\",\n        \"placeImageUrl\": \"https://example.com/sevenmagicmountains.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.0053, \"longitude\": -114.9767},\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.2,\n        \"timeToSpend\": \"1 hour (requires transport)\"\n      }\n\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Explore scenic drives, hiking trails, and stunning desert landscapes.\",\n        \"placeImageUrl\": \"https://example.com/redrockcanyon.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.2061, \"longitude\": -115.8379},\n        \"ticketPricing\": \"Entrance fee applies\",\n        \"rating\": 4.7,\n        \"timeToSpend\": \"Half day (requires transport)\"\n      },\n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"See a collection of vintage Las Vegas signs.\",\n        \"placeImageUrl\": \"https://example.com/neonmuseum.jpg\",\n        \"geoCoordinates\": {\"latitude\": 36.1637, \"longitude\": -115.1475},\n        \"ticketPricing\": \"Entrance fee applies\",\n        \"rating\": 4.4,\n        \"timeToSpend\": \"2 hours\"\n      }\n    ]\n  }\n}\n```\n\n**Note:**  This JSON uses placeholder URLs for images.  You will need to replace `https://example.com/imagename.jpg` with actual image URLs.  Also, price ranges for hotels are estimates and can vary depending on the season and availability.  Entrance fees for attractions should be checked on their official websites.  Consider using a mapping service API to get more precise geocoordinates.\n"},
        ],
      },
    ],
  });

  