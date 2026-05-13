import type { Metadata } from "next";
import StudyForm from "./StudyForm";

export const metadata: Metadata = {
  title: "Let's explore possibilities · Deeper Designs",
  description: "Nine quick questions. A verified email. We come back within 24 hours with a plan, a timeline, and a number.",
  alternates: { canonical: "https://deeperdesigns.in/start-your-study" },
};

export default function StartYourStudy() {
  return (
    <main style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <StudyForm />
    </main>
  );
}
