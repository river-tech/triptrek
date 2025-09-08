
'use client'
import LandScape from "./common/LandScape";
import About from "./common/About";
import Food from "./common/Food";
import Travel from "./common/Travel";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export default function Home() {
 

  return (
   <>
   <LandScape />
    <About />
    <Travel />
    <Food />
   </>
  );
}
