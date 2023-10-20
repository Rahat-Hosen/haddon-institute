import CourseCard from "@/components/purchase-card";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";

export default async function Course({ params }: any) {
  const { id } = params;

  const user = await currentUser();

  const course = await prisma.course.findUnique({
    where: {
      id: Number(id),
    },
  });

  return (
    <>
      <CourseCard
        userId={user?.id}
        name={course?.title}
        description={course?.description}
        price={course?.price}
      />
    </>
  );
}
