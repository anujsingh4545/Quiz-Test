import React from 'react'
import Header from '../components/Header'
import { IoPersonAddSharp } from 'react-icons/io5'

function index() {
  return (
    <div>
      <Header />

      <section className="absolute top-[50%] left-[50%] h-fit w-[100%] max-w-[100rem] translate-x-[-50%] translate-y-[-50%] transform px-5  py-10 ">
        {/*  */}

        <p className="md: w-[100%]  text-center font-serif text-[7rem] font-light tracking-wide  text-[#17a2b8] md:text-[9rem] ">
          Let's Quiz
        </p>

        <p className="w-[100%] text-center font-sans text-[2.5rem] font-thin tracking-wide text-black md:text-[5rem]">
          Test your skills and become a master.
        </p>

        <p className="mt-10 w-[100%]  text-center text-[1.5rem] tracking-wider text-[#777] md:text-[2rem] ">
          We organize quizzes on various topics.
        </p>
        <p className="mt-4 w-[100%]  text-center text-[1.5rem] tracking-wider text-[#777] md:text-[2rem] ">
          Sign up if you haven't already and get access to millions of quizzes
          on the topic of your interest.
        </p>

        <p className=" mt-10 w-[100%] text-center font-serif text-[1.6rem] font-semibold  tracking-wider ">
          Start Your Journey Here:
        </p>

        <a
          href="/sign"
          className=" m-auto mt-10 flex w-fit items-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-14  py-4 font-serif text-[1.3rem] font-semibold italic tracking-wider text-slate-100 md:text-[1.6rem]"
        >
          <IoPersonAddSharp className="mr-5 text-[1.7rem] text-white md:text-[2rem]" />
          Sign Up
        </a>

        {/*  */}
      </section>
    </div>
  )
}

export default index
