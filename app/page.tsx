import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center container">
      <Image
        src="/61-oaks-group-logo.jpeg"
        width={600}
        height={600}
        alt="61 Oaks Group Logo"
      />
      <div>
        <p className="font-bold text-2xl lg:text-4xl">
          Under construction - check back soon!
        </p>
      </div>
    </main>
  );
}
