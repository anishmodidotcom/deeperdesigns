import type { Metadata } from "next";
import StudyForm from "./StudyForm";

export const metadata: Metadata = {
  title: "Let's explore possibilities · Deeper Designs",
  description:
    "Tell us what is slowing your business down. Nine quick questions, a verified phone, and a plan, a timeline, and a number back within 24 hours.",
  openGraph: {
    title: "Let's explore possibilities · Deeper Designs",
    description:
      "Tell us what is slowing your business down. Nine quick questions, a verified phone, and a reply within 24 hours.",
    url: "/start-your-study",
  },
  alternates: { canonical: "/start-your-study" },
};

export default function StartYourStudyPage() {
  return <StudyForm />;
}
