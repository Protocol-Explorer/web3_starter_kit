"use client"
import Image from "next/image"
import { ModeToggle } from "./Modetoggle"
import Link from "next/link"


export default function Nav() {
  return(
    <header >
      <nav>
        <ul className="flex items-center justify-between">
          <li>
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/pex.png"
              alt="PEX Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
          </li>
          <Link className="p-2 px-6 rounded-2xl hover:bg-secondary" href="claim">Claim</Link>
          <Link className="p-2 px-6 rounded-2xl hover:bg-secondary" href="virtualizer">Virtualizer</Link>
          <Link className="p-2 px-6 rounded-2xl hover:bg-secondary" href="varq">VARQ</Link>
          <Link className="p-2 px-6 rounded-2xl hover:bg-secondary" href="amm">AMM</Link>
          <Link className="p-2 px-6 rounded-2xl hover:bg-secondary" href="vex">VEX</Link>
          <li><ModeToggle /></li>
        </ul>
      </nav>
    </header>
  )
}