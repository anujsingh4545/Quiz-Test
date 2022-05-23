import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { loginCheck } from '../atoms/loginCheck'

function Header() {
  const [login, setLogin] = useRecoilState(loginCheck)

  return (
    <div className="fixed top-0  z-30 w-[100%] bg-black shadow-sm shadow-black  ">
      {/*  */}

      <div className=" my-5 mx-auto  flex w-[100%] max-w-[100rem]  items-center justify-between border-0 px-3">
        <img
          src="/logo_big.png"
          alt=""
          className="my-1 hidden h-14 px-2 md:my-2 md:inline md:h-16  lg:my-1 lg:h-14"
        />
        <img
          src="/logo_small.png"
          alt=""
          className=" my-1 h-12 px-2 md:hidden "
        />

        <section className="flex items-center border-0 ">
          {login ? (
            <div className=" flex items-center">
              <Link href="/home">
                <a className=" nav-link mx-3 text-[1.5rem] italic text-white  sm:mr-6 sm:text-[2rem] ">
                  Home
                </a>
              </Link>

              <Link href="/leaderboard">
                <a className=" nav-link mx-2 text-[1.5rem] italic text-white  sm:mx-6 sm:text-[2rem] ">
                  Leaderboard
                </a>
              </Link>
            </div>
          ) : (
            <div className=" flex  ">
              <a
                href="/leaderboard"
                className=" mr-3 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-[1.1rem] italic  text-white sm:mr-5 sm:text-[1.5rem] "
              >
                Leaderboard
              </a>

              <a
                href="/login"
                className="  rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500  px-7 py-3 text-[1.1rem] italic text-white   sm:px-10 sm:text-[1.5rem] "
              >
                Log in
              </a>
            </div>
          )}
        </section>

        {/*  */}
      </div>

      {/*  */}
    </div>
  )
}

export default Header
