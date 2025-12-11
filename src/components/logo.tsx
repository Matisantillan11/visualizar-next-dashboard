import logo from "@/assets/logos/logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-20 max-w-[15.847rem]">
      <Image
        src={logo}
        fill
        alt="Visualizar logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
