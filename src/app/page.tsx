import Image from "next/image";
import { useSession } from "next-auth/react";



//Components
import ButtonUser from "@/components/auth/buttonUser";

export default function Home() {
  return (
    <div>
      <h1>Page</h1>
      <ButtonUser />
    </div>
  );
}
