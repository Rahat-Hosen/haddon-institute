import { Badge } from "./ui/badge";
import { MoveRight } from "lucide-react";

export const CustomBadge = ({ text }: { text: string }) => {
  return (
    <div className="bg-black no-underline group cursor-pointer relative  shadow-2xl rounded-full p-px text-sm font-semibold leading-6 text-white inline-block">
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
      </span>
      <div className="relative flex space-x-4 items-center z-10 rounded-full bg-black py-1 px-4 ring-1 ring-white/10 ">
        <Badge variant="secondary">NEW</Badge>
        <span>{text}</span>

        <MoveRight className="w-5 h-5" />
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </div>
  );
};
