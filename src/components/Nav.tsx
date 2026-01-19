import Link from 'next/link'
import React from 'react'
import Image from "next/image";


export default function Nav() {
  return (
    <div className='backdrop-blur-md py-6 shadow-lg sticky top-0 z-50 bg-nav/60'>
        <nav className="flex justify-between items-center max-w-350 mx-auto">
            <div className="h-30 w-30 bg-black rounded-2xl p-2 opacity-85 flex items-center justify-center">
              {/* Reemplaza con tu logo */}
              <Link href={"/"}>
                  <Image
                    width={300}
                    height={120}
                    src={"/logo1.png"}
                    alt="Fisioterapia profesional"
                  />
                </Link>
            </div>
            <h1 className="text-5xl font-bold bg-linear-to-br from-black to-dorado bg-clip-text text-transparent">
              Evolve
            </h1>

          <ul className="flex gap-8 list-none text-2xl ">
            {['Inicio', 'Tutoriales', 'Cursos', 'Contacto'].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-gray-800 font-medium hover:text-amber-200 transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
    </div>
  )
}
