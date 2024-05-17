"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import env from "@/lib/env/globals";


//Components
import ButtonUser from "@/components/auth/buttonUser";

export default function Home() {
  
  const { siteName, siteDescription } = env;
  const { data: session } = useSession();

  return (
<div className="row" style={{ height: "calc(100vh - 76px)", margin: 0, padding: 0 }}>
  <div className="d-none d-md-flex col-md-6 d-flex flex-column justify-content-center align-items-center" style={{ background: "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), linear-gradient(to bottom, var(--bs-primary), var(--bs-secondary))", height: "100%" }}>
    <div id="homepage-image-wrapper" className="py-5">
      <Image
      src="/theme/logo.png"
      alt="Next.js Logo"
      width={500}
      height={500}
    />
    </div>
  </div>
  <div className="col-12 col-md-6 d-flex flex-column justify-content-center" style={{ height: "100%" }}>
    <div className="col-12 col-md-12 d-flex flex-column justify-content-center" style={{color: "var(--bs-primary)", textAlign: "center"}}>
        <h1>{siteName}</h1>
        <p>{siteDescription}</p>
    </div>

    {session ? (<p>Logged in as {session.user.email}</p>) : (<div className="col-12 d-flex flex-column"><h2>Not signed in</h2><ButtonUser /></div>)}
    
  </div>
</div>

  );
}
