import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div className="w-10/12 xl:w-8/12 py-28 mx-auto">
      <div className="grid grid-cols-2 gap-4 sm:text-5xl text-6xl font-medium">
        <div className="text-right">
          <span className="relative">
            <Image
              src="/pos2.svg"
              alt="pos"
              width={80}
              height={80}
              className="absolute -left-24 -top-2"
            />
            Point of Saless
          </span>
        </div>
        <div className="row-span-2">
          <Image
            src="https://picsum.photos/300/170"
            alt="random-img"
            width="300"
            height="170"
            className="rounded-xl"
          />
        </div>
        <div className="text-right">
          <p>
            that Make <span className="text-slate-500">Your Life</span>
          </p>
        </div>
        <div className="col-span-2 text-center">100% Much Easier</div>
      </div>
    </div>
  );
}
