"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../Container";

const Header = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.replace(path);
  };
  return (
    <div className="border-b-2">
      <Container>
        <header className="flex p-10 justify-between ">
          <nav className="flex ">
            <div>
              <Link href="/">
                <Image
                  onClick={() => router.push("/")}
                  src="/images/logo.png"
                  alt="Ubike Logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
            <ul className="flex justify-between ">
              <li
                onClick={() => handleNavigation("/instructions")}
                className="ml-10 text-green-600 font-semibold self-center cursor-pointer"
              >
                使用說明
              </li>
              <li
                onClick={() => handleNavigation("/pricing")}
                className="ml-10 text-green-600 font-semibold self-center cursor-pointer"
              >
                收費方式
              </li>
              <li
                onClick={() => router.push("/stations")}
                className="ml-10 text-green-600 font-semibold self-center cursor-pointer"
              >
                站點資訊
              </li>
              <li
                onClick={() => handleNavigation("/news")}
                className="ml-10 text-green-600 font-semibold self-center cursor-pointer"
              >
                最新消息
              </li>
              <li
                onClick={() => handleNavigation("/events")}
                className="ml-10 text-green-600 font-semibold self-center cursor-pointer"
              >
                活動專區
              </li>
            </ul>
          </nav>
          <div className="flex text-white bg-green-600 rounded-3xl w-20 h-15 text-center justify-center items-center ">
            <Link href="/login">登入</Link>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default Header;
