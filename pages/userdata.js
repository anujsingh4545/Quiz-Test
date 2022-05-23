import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { loginCheck } from '../atoms/loginCheck'
import HeaderHome from '../components/HeaderHome'
import { useRouter } from 'next/router'
import ModalSet from '../components/ModalSet'

function userdata() {
  const [login, setLogin] = useRecoilState(loginCheck)

  const [modal, setModal] = useState(false)

  const router = useRouter()

  return (
    <div>
      <HeaderHome modal={setModal} />
      {modal && <ModalSet />}

      <section className="m-auto mt-28 h-fit w-[95%] max-w-[100rem] bg-[#e0e4e8] px-3 py-11 shadow-md sm:mt-32 sm:px-5 lg:w-[90%]   ">
        {/*  */}

        <p className="w-[100%]  text-center font-serif text-[2rem] font-semibold tracking-wide text-sky-500 md:text-[3rem] ">
          Congratulations!! You have successfully logged in.
        </p>

        <p className="mt-1  w-[100%] text-center font-serif text-[1.5rem] font-normal tracking-wide text-sky-500 md:text-[2.5rem] ">
          Before you play the quiz, here are the rules
        </p>

        <div className=" m-auto mt-10  h-fit  w-[100%] rounded-xl bg-slate-50 px-4  py-10 shadow-md sm:w-[95%] md:px-10 ">
          <p className="w-[100%] text-left font-mono  text-[2rem] font-medium tracking-wide text-sky-500 ">
            Rules:
          </p>

          <section className="px-5 text-[1.3rem] font-medium italic  ">
            <l className=" px-5">
              <li> All questions are multiple choice question. </li>
              <li className="text-red-600">Only one choice is correct.</li>
              <li>
                Every question carry equal marks i.e.
                <span className="text-red-600">4 marks for each question.</span>
              </li>
              <li>Every question is displayed only once per user.</li>
              <li>Try to answer as quickly as you can.</li>
              <li>
                If you press refresh or go back to the previous page, there will
                be a new question for you and the question you were on will be
                counted as attempted.
              </li>
              <li>Questions are displayed randomly for every user.</li>
              <li>
                You will be told immediately whether your answer was correct or
                incorrect once you submit the answer.
              </li>
            </l>
          </section>
          <button className="   w-fit rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-10 text-center font-serif text-[1.3rem] italic tracking-wider text-white md:py-3  md:px-16 ">
            <a href="/home"> Let's Play</a>
          </button>
        </div>

        {/*  */}
      </section>
    </div>
  )
}

export default userdata
