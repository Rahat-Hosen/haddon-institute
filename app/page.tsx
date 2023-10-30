import AnimatedText from "@/components/animated-text";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 my-10 xl:px-24 xl:my-20">
      <div className="space-y-12 mx-auto">
        <div>
          <AnimatedText
            text="Haddon Institute"
            className="text-3xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
          />
          <p className="text-center font-semibold text-xl tracking-tight">
            It&apos;s time to take higher Christian education seriously.
          </p>
        </div>
        <p className="font-semibold font-inter max-w-5xl text-2xl text-center text-muted-foreground">
          Take your theological edification to the next level. Learn from sound
          scriptural minds. Grow in your understanding of the Bible. Become a
          better leader.
        </p>
        <div className="flex justify-center">
          <div className="space-y-2">
            <Button size="lg" className="font-inter uppercase font-semibold">
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
