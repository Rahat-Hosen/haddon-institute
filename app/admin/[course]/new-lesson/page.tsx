import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function NewLesson({ params }: any) {
  const { course } = params;

  return (
    <div>
      <Link href={`/admin/${course}`} className={buttonVariants()}>
        Back to Course
      </Link>
    </div>
  );
}
