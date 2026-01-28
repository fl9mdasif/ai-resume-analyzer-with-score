import { type FormEvent, useState, useEffect } from 'react'
import Navbar from "~/components/shared/Navbar";
import FileUploader from "~/components/FileUploader";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { convertPdfToImage } from "~/lib/pdf2img";
import { generateUUID } from "~/lib/utils";
import { prepareInstructions, AIResponseFormat } from "../../constants";
import type { Resume } from "~/types";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate('/auth?next=/upload');
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File }) => {
        try {
            setIsProcessing(true);

            setStatusText('Uploading the file...');
            const uploadedFileResult = await fs.upload([file]);
            const uploadedFile = Array.isArray(uploadedFileResult) ? uploadedFileResult[0] : uploadedFileResult;
            if (!uploadedFile) throw new Error('Failed to upload file');

            setStatusText('Converting to image...');
            const imageFile = await convertPdfToImage(file);
            if (!imageFile.file) throw new Error(imageFile.error || 'Failed to convert PDF to image');

            setStatusText('Uploading the image...');
            const uploadedImageResult = await fs.upload([imageFile.file]);
            const uploadedImage = Array.isArray(uploadedImageResult) ? uploadedImageResult[0] : uploadedImageResult;
            if (!uploadedImage) throw new Error('Failed to upload image');

            setStatusText('Preparing data...');
            const uuid = generateUUID();
            const data = {
                id: uuid,
                resumePath: uploadedFile.path,
                imagePath: uploadedImage.path,
                companyName, jobTitle, jobDescription,
                feedback: '',
            }
            await kv.set(`resume:${uuid}`, JSON.stringify(data));

            setStatusText('Extracting content...');
            const extractedText = await ai.img2txt(imageFile.file);
            console.log('Extracted Text:', extractedText);

            if (!extractedText) {
                console.warn('Text extraction failed, falling back to manual analysis...');
            }

            setStatusText('Analyzing...');

            // If we have text, use it. Otherwise, try the file path as a last resort.
            const feedback = extractedText
                ? await ai.feedbackWithText(extractedText, prepareInstructions({ jobTitle, jobDescription, AIResponseFormat }))
                : await ai.feedback(uploadedFile.path, prepareInstructions({ jobTitle, jobDescription, AIResponseFormat }));

            if (!feedback) throw new Error('Failed to analyze resume');

            // Puter error check
            if ((feedback as any).error) {
                console.error('Puter AI Error:', (feedback as any).error);
                throw new Error(`Puter Error: ${(feedback as any).error}`);
            }

            const feedbackText = typeof feedback.message.content === 'string'
                ? feedback.message.content
                : feedback.message.content[0].text;

            console.log('Raw AI Response:', feedbackText);

            // Robust JSON extraction
            let cleanedJson = '';
            const jsonBlockMatch = feedbackText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            if (jsonBlockMatch) {
                cleanedJson = jsonBlockMatch[1];
            } else {
                const jsonMatch = feedbackText.match(/\{[\s\S]*\}/);
                cleanedJson = jsonMatch ? jsonMatch[0] : feedbackText;
            }

            try {
                data.feedback = JSON.parse(cleanedJson);
            } catch (e) {
                console.error('Failed to parse AI response as JSON. Cleaned text:', cleanedJson);
                // If it's not JSON, maybe the AI said something useful (like "I don't see the file")
                throw new Error(feedbackText.length < 200 ? feedbackText : 'The AI returned an invalid response format. Please try again.');
            }

            await kv.set(`resume:${uuid}`, JSON.stringify(data));
            setStatusText('Analysis complete, redirecting...');
            navigate(`/resume/${uuid}`);
        } catch (error) {
            console.error('Analysis error:', error);
            setStatusText(error instanceof Error ? `Error: ${error.message}` : 'An unexpected error occurred');
            setIsProcessing(false);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        // console.log(companyName, jobTitle,);
        if (!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-[url('/images/bg-main.svg')] bg-cover">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-16">
                    <h1>Smart feedback for your dream job</h1>
                    {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>

                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
