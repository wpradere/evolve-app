import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Nav() {
  return (
    <div className="backdrop-blur-md py-6 shadow-lg sticky top-0 z-50 bg-black/80">
      <nav className="flex justify-between items-center max-w-350 mx-auto">
        <div className="h-30 w-50 rounded-2xl p-2 opacity-85 flex items-center justify-center">
          <Link href={"/"}>
            <Image
              width={300}
              height={120}
              src={"/logo2.png"}
              alt="Fisioterapia profesional"
            />
          </Link>
        </div>

        <ul className="flex gap-8 list-none text-2xl ">
          <Link
            href="/#about"
            className="text-dorado hover:text-sand font-medium transition-colors text-2xl"
          >
            Acerca de nosotros
          </Link>
          <Link
            href={"/about-us"}
            className="text-dorado hover:text-sand font-medium transition-colors text-2xl"
          >
            Productos
          </Link>
        </ul>
      </nav>
    </div>
  );
}
