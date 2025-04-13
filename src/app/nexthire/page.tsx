import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function LandingPage() {
    

    return (
        <div className="min-h-screen bg-slate-900 text-white px-4 sm:px-6 md:px-10">
            <Link href="/" className="fixed top-6 left-6 z-50 flex items-center gap-2 group hover:scale-105 transition-all duration-300">
                <Image
                    src="/brand-logo.png"
                    alt="NextHire Logo"
                    width={38}
                    height={32}

                />
                <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300">
                    NextHire
                </h2>
            </Link>
            {/* Hero Section */}
            <section className="relative pt-6 h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/pattern.png"
                        alt="background pattern"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>

                <div className="container mx-auto px-4 z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                                Master Your Interview Skills with AI
                            </h1>
                            <p className="text-base sm:text-xl text-light-100/90 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                                Practice with our AI-powered interview simulator and get instant, personalized feedback to land your dream job.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center lg:justify-start">
                                <Button asChild className="btn-primary text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300">
                                    <Link href="/sign-in">Get Started Free</Link>
                                </Button>

                            </div>
                        </div>
                        <div className="flex-1 relative">
                            <Image
                                src="/robot.png"
                                alt="AI Interview Assistant"
                                width={500}
                                height={500}
                                className="animate-float w-[280px] sm:w-[400px] lg:w-[500px] h-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Why Choose NextHire?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="card-border p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 hover:from-slate-800/60 hover:to-slate-900/60 rounded-xl transition-all duration-300 transform hover:scale-105">
                                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center mb-4 sm:mb-6">
                                    <Image src={feature.icon} alt={feature.title} width={24} height={24} className="sm:w-[30px] sm:h-[30px]" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                    {feature.title}
                                </h3>
                                <p className="text-sm sm:text-base text-light-100/80">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-12 sm:py-20 bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                        How It Works
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="relative mb-6 sm:mb-8">
                                    <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xl sm:text-2xl font-bold">
                                        {index + 1}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-8 sm:top-10 left-[60%] w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 hidden md:block" />
                                    )}
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 bg-gradient-to-r from-blue-200 to-indigo-200 bg-clip-text text-transparent">
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base text-light-100/80">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-base sm:text-xl text-light-100/90 mb-8 sm:mb-12 max-w-2xl mx-auto">
                        Join thousands of job seekers who have improved their interview skills with NextHire.
                    </p>
                    <Button asChild className="btn-primary text-lg px-8 py-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300">
                        <Link href="/sign-up">Start Practicing Now</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

const features = [
    {
        title: "AI-Powered Interviews",
        description: "Practice with our intelligent AI interviewer that adapts to your responses and provides realistic scenarios.",
        icon: "/ai-robot.svg"
    },
    {
        title: "Instant Feedback",
        description: "Get detailed feedback on your performance, including communication skills, technical knowledge, and areas for improvement.",
        icon: "/star.svg"
    },
    {
        title: "Multiple Interview Types",
        description: "Practice behavioral, technical, and mixed interviews across various roles and industries.",
        icon: "/tech.svg"
    },
    {
        title: "Real-time Transcripts",
        description: "Review your interview responses with detailed transcripts and performance analytics.",
        icon: "/file.svg"
    },
    {
        title: "Global Best Practices",
        description: "Learn from industry-standard interview techniques and best practices from top companies.",
        icon: "/globe.svg"
    },
    {
        title: "Progress Tracking",
        description: "Monitor your improvement over time with detailed progress tracking and performance metrics.",
        icon: "/calendar.svg"
    }
];

const steps = [
    {
        title: "Create Your Account",
        description: "Sign up for free and set up your profile with your career goals and preferences."
    },
    {
        title: "Choose Your Interview",
        description: "Select from various interview types and difficulty levels based on your target role."
    },
    {
        title: "Practice & Improve",
        description: "Get instant feedback after each interview and track your progress over time."
    }
];