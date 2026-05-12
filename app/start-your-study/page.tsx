import type { Metadata } from "next";
import StudyForm from "./StudyForm";

export const metadata: Metadata = {
  title: "Start Your Possibility Study · Deeper Designs",
  description:
    "Tell us what is slowing your business down. A nine-step intake. A verified phone number. A study plan, a timeline, and a number back within 24 hours.",
  openGraph: {
    title: "Start Your Possibility Study · Deeper Designs",
    description:
      "Tell us what is slowing your business down. A nine-step intake. A study plan back within 24 hours.",
    url: "/start-your-study",
  },
};

export default function StartYourStudyPage() {
  return <StudyForm />;
}
