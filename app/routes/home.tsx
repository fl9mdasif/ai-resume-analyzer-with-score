import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AI Resume Analyzer" },
    { name: "description", content: "Analyze your resume with AI" },
  ];
}

export default function Home() {
  return <main>
    <section className="main-section">
      <div className="page-heading">
        <h1>Track Your Applications & Resume Ready </h1>
        <p>Analyze your resume with AI</p>
      </div>

    </section>
  </main>;
}
