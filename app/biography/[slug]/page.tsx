import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Biography({ params }: any) {
  const slug = params;

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!course) {
    redirect("/not-found");
  }

  return <div></div>;
}
