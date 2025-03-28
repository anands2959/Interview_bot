import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import {
  getFeedbackByInterviewId,
  getInterviewById,
} from "@/lib/actions/general.action";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Feedback = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);
  if (!interview) redirect("/");

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  });

  return (
    <section className="min-h-screen p-8 from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto space-y-8 backdrop-blur-lg bg-slate-800/30 p-8 rounded-2xl shadow-xl animate-fadeIn">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent animate-gradient">
            Feedback on the Interview -{" "}
            <span className="capitalize">{interview.role}</span> Interview
          </h1>
        </div>

        <div className="flex justify-center items-center gap-8 p-4 bg-slate-800/50 rounded-xl">
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
            <Image src="/star.svg" width={24} height={24} alt="star" className="animate-pulse" />
            <p className="text-lg">
              Overall Impression:{" "}
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                {feedback?.totalScore}
              </span>
              <span className="text-amber-400/80">/100</span>
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-lg backdrop-blur-sm">
            <Image src="/calendar.svg" width={24} height={24} alt="calendar" />
            <p className="text-lg text-blue-200">
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="p-6 bg-slate-800/50 rounded-xl space-y-4">
          <p className="text-xl leading-relaxed text-slate-200">{feedback?.finalAssessment}</p>
        </div>

        <div className="space-y-6 bg-slate-800/50 rounded-xl p-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Breakdown of the Interview</h2>
          <div className="grid gap-6">
            {feedback?.categoryScores?.map((category, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/40 transition-colors duration-300">
                <p className="text-xl font-bold bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                  {index + 1}. {category.name} 
                  <span className="ml-2 text-blue-400">({category.score}/100)</span>
                </p>
                <p className="mt-2 text-slate-300">{category.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Strengths</h3>
            <ul className="space-y-3">
              {feedback?.strengths?.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200">
                  <span className="text-emerald-400 mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent">Areas for Improvement</h3>
            <ul className="space-y-3">
              {feedback?.areasForImprovement?.map((area, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-200">
                  <span className="text-rose-400 mt-1">•</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button className="flex-1 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105">
            <Link href="/" className="flex w-full justify-center">
              <p className="text-sm font-semibold text-slate-200">Back to Dashboard</p>
            </Link>
          </Button>

          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
            <Link href={`/interview/${id}`} className="flex w-full justify-center">
              <p className="text-sm font-semibold text-white">Retake Interview</p>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
