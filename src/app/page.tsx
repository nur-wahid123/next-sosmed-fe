import Hero from "@/components/hero";
import Navbar from "@/components/navigation/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-32">
        <Hero />
        <div className="mx-auto rounded-t-3xl xl:w-8/12 bg-violet-100">
          <div className="w-10/12 xl:w-8/12 pt-20 mx-auto">
            <div className="flex items-center justify-between font-medium">
              <div className="w-1/3">
                <p className="text-xl">
                  Sometimes Do Something Difficult by Yourself
                </p>
              </div>
              <div className="text-right">
                <p>Our Point Of Sale is the best in the world</p>
                <p>I Think......</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
