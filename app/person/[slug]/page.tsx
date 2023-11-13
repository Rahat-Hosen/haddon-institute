import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Person({ params }: any) {
  const slug = params.slug;

  const person = await prisma.people.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!person) {
    redirect("/not-found");
  }

  return <div></div>;
}
