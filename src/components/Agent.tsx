"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}

interface AgentProps {
  userName: string;
  userId: string | undefined;
  interviewId?: string;
  feedbackId?: string;
  type: "generate" | "interview";
  questions?: string[];
  profileImage?: string;
}

const Agent = ({
  userName,
  userId,
  interviewId,
  feedbackId,
  type,
  questions,
  profileImage,
}: AgentProps) => {
  const router = useRouter();
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastMessage, setLastMessage] = useState<string>("");

  useEffect(() => {
    const onCallStart = () => {
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
    };

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    const onSpeechStart = () => {
      console.log("speech start");
      setIsSpeaking(true);
    };

    const onSpeechEnd = () => {
      console.log("speech end");
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.log("Error:", error);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1].content);
    }

    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log("handleGenerateFeedback");

      const { success, feedbackId: id } = await createFeedback({
        interviewId: interviewId!,
        userId: userId!,
        transcript: messages,
        feedbackId,
      });

      if (success && id) {
        router.push(`/interview/${interviewId}/feedback`);
      } else {
        console.log("Error saving feedback");
        router.push("/");
      }
    };

    if (callStatus === CallStatus.FINISHED) {
      if (type === "generate") {
        router.push("/");
      } else {
        handleGenerateFeedback(messages);
      }
    }
  }, [messages, callStatus, feedbackId, interviewId, router, type, userId]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
        variableValues: {
          username: userName,
          userid: userId,
        },
      });
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI Interviewer Card */}
          <div className="relative bg-gradient-to-br from-cyan-600/30 to-blue-600/30 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50 shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <Image
                    src="/ai.png"
                    alt="AI Interviewer"
                    fill
                    className="object-cover"
                  />
                  {isSpeaking && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">AI Interviewer</h3>
                {isSpeaking && (
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="relative bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50 shadow-xl">
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-slate-700 to-slate-600 p-1">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-900">
                  <Image
                    src="/profile.svg"
                    alt="User Profile"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-100">{userName}</h3>
                <p className="text-gray-400 mt-1">{type === 'generate' ? 'Interview Generation' : 'Interview Session'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        {messages.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 rounded-2xl p-6 backdrop-blur-lg border border-gray-700/50 shadow-xl">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed animate-fadeIn">
                {lastMessage}
              </p>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div className="flex justify-center pt-4">
          {callStatus !== CallStatus.ACTIVE ? (
            <button
              onClick={handleCall}
              className={cn(
                "relative px-8 py-3 text-lg font-medium rounded-full transition-all duration-300",
                callStatus === CallStatus.CONNECTING
                  ? "bg-gradient-to-r from-cyan-600/50 to-blue-600/50 text-gray-300 cursor-wait"
                  : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105"
              )}
            >
              <span className={cn(
                "absolute inset-0 rounded-full opacity-75",
                callStatus === CallStatus.CONNECTING ? "animate-ping bg-gradient-to-r from-cyan-600/50 to-blue-600/50" : "hidden"
              )} />
              <span className="relative">
                {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                  ? "Start Interview"
                  : "Connecting..."}
              </span>
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300"
            >
              End Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Agent;
