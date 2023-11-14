import React from "react";
import { ModeToggle } from "./theme-toggle";
type TLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: TLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-4 sm:mx-auto font-sans ">
      <div className="my-20 w-full">
        <div className="flex justify-between items-center ">
          <div className=" font-black text-6xl   ">Multi-user</div>
          <ModeToggle />
        </div>
        <hr />
      </div>

      <div className=" grow w-full    ">{children}</div>
      <div className="flex justify-center font-mono mb-2 ">
        <a className="hover:underline cursor-pointer" href="https://hixm.vercel.app/">_hixm</a>
      </div>
    </div>
  );
}
