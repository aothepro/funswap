import { Footer } from "@/components/Footer/Footer";
import { Spinner } from "@/components/Spinner/Spinner";
import { TokenSwap } from "@/components/TokenSwap/TokenSwap";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="font-sans grid items-center justify-items-center min-h-screen gap-16">
      <main className="flex flex-col gap-[32px] row-start-2 items-center w-full">
        <Suspense
          fallback={
            <div className="flex gap-3">
              <Spinner />
              <h1 className="my-auto text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Loading FunSwap...
              </h1>
            </div>
          }
        >
          <TokenSwap />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <Footer />
      </footer>
    </div>
  );
}
