export const SelectPreparationLevels = [
    {
        id: 1,
        title: 'Beginner',
        desc: 'Starting from scratch with no prior knowledge.',
        icon: '🔰',
    },
    {
        id: 2,
        title: 'Intermediate',
        desc: 'Some familiarity with the subject but need improvement.',
        icon: '📖',
    },
    {
        id: 3,
        title: 'Advanced',
        desc: 'Well-versed with the subject, aiming for mastery.',
        icon: '🎓',
    },
];

export const AI_PROMPT = 'Generate a structured JSON roadmap for {exam}, to be completed in {months} months based on the {experience} preparation level. The JSON should contain the following keys: \n1. **resources**: A list of **paid and unpaid** resources, each with: \n   - `title`: Name of the resource \n   - `type`: Book, Video, Course, Website, Article \n   - `platform`: Udemy, Coursera, YouTube, etc. \n   - `url`: Direct resource link \n\n2. **weekly_plan**: A breakdown of topics and tasks for each week: \n   - `week_number`: Week index \n   - `topics`: List of topics covered \n   - `tasks`: Study actions (e.g., "Watch XYZ video", "Read ABC book", "Solve 10 problems on LeetCode") \n\nEnsure that the JSON is **valid, structured, and formatted correctly**. Each section must have **clear key-value pairs** for easy Firebase storage. **Return JSON only, no extra explanations.**';
