import React from 'react'

import { FiLogOut } from 'react-icons/fi'
import axios from 'axios'
import { useRouter } from 'next/router'

function HeaderHome({ modal }) {
  const router = useRouter()

  const logOut = async () => {
    if (confirm('Are you sure you want to log out ⚠️')) {
      const user = await axios.get('../api/auth/log')
      if (user.status === 200) {
        localStorage.setItem('USERNAME', JSON.stringify(''))
        router.replace('/login')
      }
    }
  }

  return (
    <div className="fixed top-0  z-30 w-[100%] bg-black shadow-sm shadow-black  ">
      {/*  */}

      <div className=" my-5 mx-auto  flex w-[100%] max-w-[100rem]  items-center justify-between border-0 px-5 ">
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

        <section className="flex items-baseline border-0 ">
          <div className=" mr-1 flex items-center md:mr-0 ">
            <a
              href="/home"
              className=" nav-link mx-3 text-[1.5rem] italic text-white  sm:mr-6 sm:text-[2rem] "
            >
              Home
            </a>

            <a
              href="/leaderboard"
              className=" nav-link mx-2 text-[1.5rem] italic text-white  sm:mx-6 sm:text-[2rem] "
            >
              Leaderboard
            </a>

            <div>
              <FiLogOut
                className="ml-3 animate-pulse cursor-pointer text-[2rem] font-bold text-[#cd1818] sm:ml-6 "
                onClick={() => logOut()}
              />
            </div>
          </div>
        </section>

        {/*  */}
      </div>

      {/*  */}
    </div>
  )
}

export default HeaderHome
