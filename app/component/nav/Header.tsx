"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Container from "../Container";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const navLinks = [
  {
    label: "使用說明",
    path: "/instructions",
  },
  {
    label: "收費方式",
    path: "/pricing",
  },
  {
    label: "站點資訊",
    path: "/stations",
  },
  {
    label: "最新消息",
    path: "/news",
  },
  {
    label: "活動專區",
    path: "/events",
  },
];

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [animationParent] = useAutoAnimate();

  const router = useRouter();
  const pathName = usePathname();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (path: string) => {
    router.replace(path);
  };
  return (
    <div className="border-b-2">
      <Container>
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-6 md:px-10">
          <section className="flex items-center ">
            <Link href="/">
              <Image
                onClick={() => router.push("/")}
                src="/images/logo.png"
                alt="Ubike Logo"
                width="100"
                height="100"
              />
            </Link>

            <nav>
              <ul className="hidden md:flex my-8 items-center text-green-700  ">
                {navLinks.map((link, i) => (
                  <li
                    key={i}
                    onClick={() => handleNavigation(link.path)}
                    className={`ml-10 hover:text-greenery active:text-greenery font-semibold self-center cursor-pointer ${
                      pathName === link.path
                        ? "text-greenery"
                        : "text-green-700"
                    } `}
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            </nav>
          </section>

          <div className="hidden md:flex text-white bg-greenery rounded-3xl h-10 w-20 text-center justify-center items-center ">
            <Link href="/login">登入</Link>
          </div>

          {showMenu && (
            <div className="fixed inset-x-0 top-[5rem] h-full  flex flex-col justify-between  bg-greenery text-white md:hidden z-10">
              <section className=" my-4   ">
                {navLinks.map((link, i) => (
                  <li
                    key={i}
                    onClick={() => handleNavigation(link.path)}
                    className={`ml-[3rem] mt-1 mb-8 hover:text-green-300 font-semibold self-center cursor-pointer list-none ${
                      pathName === link.path ? "text-green-700" : "text-white"
                    }`}
                  >
                    {link.label}
                  </li>
                ))}
              </section>
              <div className="flex flex-col ml-[3rem] absolute bottom-[7rem] text-greenery bg-white rounded-3xl h-10 w-20 text-center justify-center items-center ">
                <Link href="/login">登入</Link>
              </div>
            </div>
          )}

          <button
            ref={animationParent}
            onClick={toggleMenu}
            className="text-4xl text-greenery md:hidden"
          >
            {showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </header>
      </Container>
    </div>
  );
};

export default Header;
