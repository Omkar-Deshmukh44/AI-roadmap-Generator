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
        {text: "Generate a structured JSON roadmap for {exam}, to be completed in {months} months by studying for {no_of_hours} hours daily. The user has a {experience} preparation level.  \n\nReturn JSON with the following keys:  \n1. **resources**: A list of both **paid and unpaid** resources, each with:  \n   - `title`: Name of the resource  \n   - `type`: Book, Video, Course, Website, Article  \n   - `platform`: Udemy, Coursera, YouTube, etc.  \n   - `url`: Direct resource link  \n\n2. **weekly_plan**: A breakdown of topics and tasks for each week:  \n   - `week_number`: Week index  \n   - `topics`: List of topics covered  \n   - `tasks`: Study actions (e.g., \"Watch XYZ video\", \"Read ABC book\", \"Solve 10 problems on LeetCode\")  \n\nEnsure that:  \n The JSON is **valid, structured, and formatted correctly**.  \n Each section has **clear key-value pairs** for easy Firebase storage.  \n **No extra text or explanations**—return JSON only.  \n"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n{\n  \"exam\": \"Software Engineering Exam\",\n  \"months\": 3,\n  \"no_of_hours\": 4,\n  \"experience\": \"Beginner\",\n  \"resources\": [\n    {\n      \"title\": \"Introduction to Algorithms\",\n      \"type\": \"Book\",\n      \"platform\": \"MIT Press\",\n      \"url\": \"https://mitpress.mit.edu/books/introduction-algorithms\"\n    },\n    {\n      \"title\": \"Cracking the Coding Interview\",\n      \"type\": \"Book\",\n      \"platform\": \"Amazon\",\n      \"url\": \"https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X\"\n    },\n    {\n      \"title\": \"Data Structures and Algorithms Specialization\",\n      \"type\": \"Course\",\n      \"platform\": \"Coursera\",\n      \"url\": \"https://www.coursera.org/specializations/data-structures-algorithms\"\n    },\n    {\n      \"title\": \"FreeCodeCamp\",\n      \"type\": \"Website\",\n      \"platform\": \"FreeCodeCamp.org\",\n      \"url\": \"https://www.freecodecamp.org/\"\n    },\n    {\n      \"title\": \"LeetCode\",\n      \"type\": \"Website\",\n      \"platform\": \"LeetCode.com\",\n      \"url\": \"https://leetcode.com/\"\n    },\n    {\n      \"title\": \"Software Engineering Fundamentals\",\n      \"type\": \"Course\",\n      \"platform\": \"Udemy\",\n      \"url\": \"https://www.udemy.com/course/software-engineering-fundamentals/\"\n    }\n  ],\n  \"weekly_plan\": [\n    {\n      \"week_number\": 1,\n      \"topics\": [\"Introduction to Programming\", \"Basic Data Structures\"],\n      \"tasks\": [\"Read Chapter 1 of 'Introduction to Algorithms'\", \"Complete FreeCodeCamp's Basic Algorithm Scripting\", \"Solve 5 easy LeetCode problems\"]\n    },\n    {\n      \"week_number\": 2,\n      \"topics\": [\"Arrays and Strings\", \"Linked Lists\"],\n      \"tasks\": [\"Read Chapter 2 of 'Introduction to Algorithms'\", \"Watch relevant YouTube videos on Arrays and Linked Lists\", \"Solve 10 medium LeetCode problems\"]\n    },\n    {\n      \"week_number\": 3,\n      \"topics\": [\"Trees and Graphs\", \"Searching Algorithms\"],\n      \"tasks\": [\"Read Chapter 3 of 'Introduction to Algorithms'\", \"Complete relevant sections of 'Data Structures and Algorithms Specialization'\", \"Solve 5 medium and 5 hard LeetCode problems\"]\n    },\n    {\n      \"week_number\": 4,\n      \"topics\": [\"Sorting Algorithms\", \"Dynamic Programming\"],\n      \"tasks\": [\"Read Chapter 4 of 'Introduction to Algorithms'\", \"Review previous topics\", \"Solve 10 hard LeetCode problems\"]\n    },\n    {\n      \"week_number\": 5,\n      \"topics\": [\"Object-Oriented Programming\", \"Software Design Principles\"],\n      \"tasks\": [\"Read 'Cracking the Coding Interview' relevant sections\", \"Complete Udemy Software Engineering course\", \"Solve 5 medium and 5 hard LeetCode problems\"]\n    },\n    {\n      \"week_number\": 6,\n      \"topics\": [\"Databases\", \"Software Testing\"],\n      \"tasks\": [\"Research databases and testing techniques online\", \"Practice writing test cases\", \"Review all topics\"]\n    },\n    {\n      \"week_number\": 7,\n      \"topics\": [\"Revision\", \"Mock Exams\"],\n      \"tasks\": [\"Review all topics\", \"Take mock exams\", \"Focus on weak areas\"]\n    },\n    {\n      \"week_number\": 8,\n      \"topics\": [\"Revision\", \"Mock Exams\"],\n      \"tasks\": [\"Review all topics\", \"Take mock exams\", \"Focus on weak areas\"]\n    },\n    {\n      \"week_number\": 9,\n      \"topics\": [\"Final Revision\", \"Exam Prep\"],\n      \"tasks\": [\"Review all topics\", \"Finalize study plan\", \"Relax and stay calm\"]\n    }\n  ]\n}\n```\n"},
      ],
    },
  ],
});