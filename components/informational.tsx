"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";

export default function Informational() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
          <Link href="/mission-statement">
            <Image
              src="/emil-widlund-xrbbXIXAWY0-unsplash.jpg"
              height={1000}
              width={1000}
              alt="Image"
              className="h-[650px] w-[500px] rounded-2xl hover:shadow-2xl transition-all duration-300 object-cover brightness-75"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="relative drop-shadow-2xl backdrop-blur-xl rounded-2xl p-8">
                <div className="space-y-2">
                  <h3 className="text-center font-semibold text-2xl text-white">
                    Engaging Culture
                  </h3>
                  <p className="text-center text-neutral-300">
                    Equipping the next generation with a culture engaging
                    mindset for a purposeful future.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Tilt>
      </div>
      <div className="relative">
        <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4}>
          <Link href="/mission-statement">
            <Image
              src="/priscilla-du-preez-Wbyfby353Ag-unsplash.jpg"
              height={1000}
              width={1000}
              alt="Image"
              className="h-[650px] w-[500px] rounded-2xl hover:shadow-2xl transition-all duration-300 object-cover brightness-75"
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="relative drop-shadow-2xl backdrop-blur-xl rounded-2xl p-8">
                <div className="space-y-2">
                  <h3 className="text-center font-semibold text-2xl text-white">
                    Legacy Building
                  </h3>
                  <p className="text-center text-neutral-300">
                    Building a legacy by cultivating young leaders and visionary
                    thinkers, passing on wisdom and faith.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Tilt>
      </div>
    </div>
  );
}
