import AnimatedText from "@/components/animated-text";
import EventCalendar from "@/components/events/calendar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Haddon Institute",
  description: "Learn more about Haddon's upcoming events.",
};

export default function Events() {
  return (
    <div className="space-y-8 px-4 my-20">
      <AnimatedText
        text="Events"
        className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
      />
      <p className="text-center">View our upcoming events and open nights!</p>
      <div className="max-w-7xl mx-auto rounded-2xl bg-muted p-8">
        <EventCalendar />
      </div>
    </div>
  );
}
