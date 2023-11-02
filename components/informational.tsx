"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

export default function Informational() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
      <div className="relative">
        <Tilt
          glareEnable
          glarePosition="bottom"
          glareMaxOpacity={0.3}
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
        >
          <Link href="/collections/latest-arrivals">
            <Image
              src="/sixteen-miles-out-KSaLhgex8F0-unsplash.jpg"
              height={500}
              width={500}
              alt="Image"
              className="rounded-2xl hover:shadow-2xl transition-all duration-300 object-cover brightness-75"
            />
            <p className="absolute bottom-4 left-4 right-4 font-bold text-2xl drop-shadow-2xl p-12 backdrop-blur-xl">
              Latest Arrivals
            </p>
          </Link>
        </Tilt>
      </div>
      <div className="relative">
        <Tilt
          glareEnable
          glarePosition="bottom"
          glareMaxOpacity={0.3}
          tiltMaxAngleX={2}
          tiltMaxAngleY={2}
        >
          <Link href="/collections/featured-titles">
            <Image
              src="/sixteen-miles-out-KSaLhgex8F0-unsplash.jpg"
              height={500}
              width={500}
              alt="Image"
              className="rounded-2xl hover:shadow-2xl transition-all duration-300  object-cover brightness-75"
            />
            <p className="absolute bottom-4 left-4 right-4 font-bold text-2xl drop-shadow-2xl p-12 backdrop-blur-xl">
              Featured Titles
            </p>
          </Link>
        </Tilt>
      </div>
    </div>
  );
}
