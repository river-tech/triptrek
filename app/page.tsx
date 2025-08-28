
'use client'
import LandScape from "./common/LandScape";
import About from "./common/About";
import Food from "./common/Food";
import Travel from "./common/Travel";
import { useEffect } from "react";

export default function Home() {
  const cloudname = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const apisecret = process.env.NEXT_PUBLIC_API_SECRET;

  useEffect(() => {
    console.log("Environment variables:");
    console.log("CLOUD_NAME:", cloudname);
    console.log("API_KEY:", apikey);
    console.log("API_SECRET:", apisecret);
  }, [cloudname, apikey, apisecret]);
  
  return (
   <>
    <LandScape />
    <About />
    <Travel />
    <Food />
   </>
  );
}
