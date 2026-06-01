import type { Metadata } from "next";
import StudyForm from "./StudyForm";

export const metadata: Metadata = {
  title: "Start Your Study · Deeper Designs",
  description: "Start a conversation with Deeper Designs. WhatsApp us with your business and what's slowing you down. We respond within 4 hours.",
  alternates: { canonical: "https://www.deeperdesigns.in/start-your-study" },
};

export default function StartYourStudy() {
  return (
    <main style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <StudyForm />
    </main>
  );
}
