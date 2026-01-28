import type { Resume } from "../app/types";

export const resumes: Resume[] = [
    {
        id: "1",
        companyName: "Google",
        jobTitle: "Frontend Developer",
        imagePath: "/images/resume_01.png",
        resumePath: "/resumes/resume-1.pdf",
        feedback: {
            overallScore: 85,
            ATS: { score: 90, tips: [] },
            toneAndStyle: { score: 90, tips: [] },
            content: { score: 90, tips: [] },
            structure: { score: 90, tips: [] },
            skills: { score: 90, tips: [] },
        },
    },
    {
        id: "2",
        companyName: "Microsoft",
        jobTitle: "Cloud Engineer",
        imagePath: "/images/resume_02.png",
        resumePath: "/resumes/resume-2.pdf",
        feedback: {
            overallScore: 55,
            ATS: { score: 80, tips: [] },
            toneAndStyle: { score: 70, tips: [] },
            content: { score: 60, tips: [] },
            structure: { score: 65, tips: [] },
            skills: { score: 75, tips: [] },
        },
    },
    {
        id: "3",
        companyName: "Apple",
        jobTitle: "iOS Developer",
        imagePath: "/images/resume_03.png",
        resumePath: "/resumes/resume-3.pdf",
        feedback: {
            overallScore: 75,
            ATS: { score: 85, tips: [] },
            toneAndStyle: { score: 80, tips: [] },
            content: { score: 75, tips: [] },
            structure: { score: 70, tips: [] },
            skills: { score: 80, tips: [] },
        },
    },
];

export const AIResponseFormat = `{
  "overallScore": number,
  "ATS": {
    "score": number,
    "tips": [
      { "type": "good" | "improve", "tip": "string" }
    ]
  },
  "toneAndStyle": {
    "score": number,
    "tips": [
      { "type": "good" | "improve", "tip": "string", "explanation": "string" }
    ]
  },
  "content": {
    "score": number,
    "tips": [
      { "type": "good" | "improve", "tip": "string", "explanation": "string" }
    ]
  },
  "structure": {
    "score": number,
    "tips": [
      { "type": "good" | "improve", "tip": "string", "explanation": "string" }
    ]
  },
  "skills": {
    "score": number,
    "tips": [
      { "type": "good" | "improve", "tip": "string", "explanation": "string" }
    ]
  }
}`;

export const prepareInstructions = ({ jobTitle, jobDescription, AIResponseFormat }: { jobTitle: string; jobDescription: string; AIResponseFormat: string; }) =>
    `Analyze the resume file attached to this message and provide a detailed review for the position of ${jobTitle}.

    CRITICAL RULES:
    1. **ANALYSIS**: You must read the content of the attached file. If you cannot see it, notify the user.
    2. **SCORING**: Provide a numeric score (1-100) for every category. Zero is only for completely missing information.
    3. **JSON FORMAT**: Your response MUST be a single, valid JSON object. No markdown, no backticks, no preamble.
    4. **CONTENT**: For Tone & Style, Content, Structure, and Skills, provide a score and a list of tips (type: "good" or "improve").

    JOB INFORMATION:
    - Target Role: ${jobTitle}
    - Requirements: ${jobDescription}

    EXPECTED JSON STRUCTURE:
    ${AIResponseFormat}`;
