import AnimatedText from "@/components/animated-text";
import { Button } from "@/components/ui/button";
import { Church, LayoutList } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Research Journal | Haddon Institute",
  description:
    "Access Haddon's wide array of blogs posts, articles and studies.",
};

export default function ResearchJournal() {
  return (
    <div className="space-y-12 my-20">
      <div className="px-4 space-y-8">
        <AnimatedText
          text="Research Journal"
          className="text-lg md:text-xl lg:text-4xl xl:text-6xl flex justify-center tracking-tighter font-bold"
        />
        <p className="text-center text-muted-foreground text-lg max-w-3xl mx-auto">
          The Haddon Institute Research Journal is a collection of articles,
          blog posts and studies written by our staff and students. We hope
          these resources will be a blessing to you and your ministry.
        </p>
      </div>
      <div className="relative">
        <Image
          src="/seb-r30LqGb3cbo-unsplash.jpg"
          height={2000}
          width={2000}
          quality={100}
          priority
          alt="Mount Coot-Tha"
          className="h-[600px] object-cover w-full brightness-75"
        />
        <div className="absolute place-items-center inset-0 flex justify-center px-4">
          <p className="text-2xl font-bold tracking-tight text-white">
            Rigourous scholarship that equips readers to apply a robust biblical
            worldview.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 max-w-7xl mx-auto">
        <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
          <Church
            strokeWidth={1}
            width={40}
            height={40}
            className="text-muted-foreground"
          />
          <h2 className="font-semibold text-xl">Purpose and Beliefs</h2>
          <p className="text-muted-foreground">
            In keeping with the Vision and Mission of the Haddon Institute, The
            Haddon Institute Research Journal (HIRJ) will advance Christ’s
            kingdom through rigorous scholarship that equips readers to apply a
            robust biblical worldview. The descriptors for the governing beliefs
            of the HIRJ are evangelical, confessional, and missional.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl p-8 hover:bg-muted hover:shadow-2xl transition-all duration-300">
          <LayoutList
            strokeWidth={1}
            width={40}
            height={40}
            className="text-muted-foreground"
          />
          <h2 className="font-semibold text-xl">Values and Integrated Tasks</h2>
          <p className="text-muted-foreground">
            The HIRJ will accomplish its purpose by publishing original research
            that bridges the gaps between three values: proclaiming Christ,
            promoting rigorous scholarship, and equipping local churches. The
            integration of these three values leads to three integrated tasks:
            advance Christian wisdom, cultivate informed apologetics, and
            mobilize missional fellowship.
          </p>
        </div>
      </div>
    </div>
  );
}
