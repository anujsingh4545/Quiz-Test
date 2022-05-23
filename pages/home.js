import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { loginCheck } from '../atoms/loginCheck'
import HeaderHome from '../components/HeaderHome'
import { useRouter } from 'next/router'
import { FaDatabase } from 'react-icons/fa'
import Questionsmodel from '../components/Questionsmodel'
import ModalSet from '../components/ModalSet'
import { db } from '../firebase'
// import { BallTriangle } from 'react-loader-spinner'
import { doc, getDoc } from 'firebase/firestore'
// import Image from 'next/image'
// import axios from 'axios'

function home() {
  const [topic, settopic] = useState('')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)
  const [scomputer, setComputers] = useState(0)
  const [ssports, setSports] = useState(0)
  const [shistory, setHistory] = useState(0)
  const [snature, setNature] = useState(0)
  const [scartoon, setCartoon] = useState(0)
  const [scomics, setComics] = useState(0)
  const [sgeography, setGeography] = useState(0)
  const [spolitics, setPolitics] = useState(0)
  const [smathematics, setMathematics] = useState(0)
  const [stelevision, setTelivision] = useState(0)
  const [modal, setmodal] = useState(false)

  useEffect(async () => {
    let leadsFromLocalStorage = await JSON.parse(
      localStorage.getItem('USERNAME')
    )
    if (leadsFromLocalStorage) {
      await setUser(leadsFromLocalStorage)
    }
  }, [db])

  useEffect(async () => {
    setLoading(true)
    await runscore()
  }, [user, modal])

  const runscore = async () => {
    if (user.length > 0) {
      const docRef = doc(db, 'Computers', user) // getting user data from firebase
      const docSnap = await getDoc(docRef)
      setComputers(docSnap.data().score)

      const docRef1 = doc(db, 'Sports', user) // getting user data from firebase
      const docSnap1 = await getDoc(docRef1)
      setSports(docSnap1.data().score)

      const docRef2 = doc(db, 'History', user) // getting user data from firebase
      const docSnap2 = await getDoc(docRef2)
      setHistory(docSnap2.data().score)

      const docRef3 = doc(db, 'Nature', user) // getting user data from firebase
      const docSnap3 = await getDoc(docRef3)
      setNature(docSnap3.data().score)

      const docRef4 = doc(db, 'Cartoons', user) // getting user data from firebase
      const docSnap4 = await getDoc(docRef4)
      setCartoon(docSnap4.data().score)

      const docRef5 = doc(db, 'Comics', user) // getting user data from firebase
      const docSnap5 = await getDoc(docRef5)
      setComics(docSnap5.data().score)

      const docRef6 = doc(db, 'Geography', user) // getting user data from firebase
      const docSnap6 = await getDoc(docRef6)
      setGeography(docSnap6.data().score)

      const docRef7 = doc(db, 'Politics', user) // getting user data from firebase
      const docSnap7 = await getDoc(docRef7)
      setPolitics(docSnap7.data().score)

      const docRef8 = doc(db, 'Mathematics', user) // getting user data from firebase
      const docSnap8 = await getDoc(docRef8)
      setMathematics(docSnap8.data().score)

      const docRef9 = doc(db, 'Television', user) // getting user data from firebase
      const docSnap9 = await getDoc(docRef9)
      setTelivision(docSnap9.data().score)

      setLoading(false)
    } else {
      return
    }
  }

  const Optionbox = ({ image, title, score }) => (
    <section
      className="mb-10  w-[95%] cursor-pointer  rounded-xl bg-white shadow-lg delay-75 duration-300 ease-in-out hover:scale-105  md:w-[45%] "
      onClick={() => {
        settopic(title)
        setmodal(true)
      }}
    >
      {/*  */}

      <img
        src={`/${image}.jpg`}
        alt="error"
        className=" m-auto h-[20rem] w-[100%] flex-1  p-5 md:h-[25rem] "
      />

      <div className="flex w-[100%] justify-between rounded-b-xl border-t-[0.1rem] border-slate-400 bg-slate-300 px-6 py-4 ">
        <p className="font-serif text-[2rem] font-medium italic text-black  ">
          {title}
        </p>

        <p className="flex items-center font-serif text-[1.5rem] font-medium italic text-black ">
          <FaDatabase className="mr-3 text-[1.5rem] text-red-700 " /> {score}
        </p>
      </div>

      {/*  */}
    </section>
  )

  return modal ? (
    <Questionsmodel modal={setmodal} topic={topic} username={user} />
  ) : (
    <div>
      <HeaderHome />

      <h1 className="mt-36 w-[100%] text-center   font-serif text-[2.6rem] font-medium tracking-wider text-black  md:text-[4.2rem] ">
        Available Categories
      </h1>

      {loading ? (
        <div className="  absolute top-[50%] left-[50%] h-fit w-fit translate-x-[-50%] translate-y-[-50%] transform  items-center justify-center">
          {/* <BallTriangle color="#00BFFF" height={80} width={80} /> */}
        </div>
      ) : (
        <div className="m-auto my-10 flex  w-[100%] max-w-[90rem] flex-wrap items-center justify-around border-0 border-black md:my-16 ">
          <Optionbox image="computers" title="Computers" score={scomputer} />
          <Optionbox image="sports" title="Sports" score={ssports} />
          <Optionbox image="history" title="History" score={shistory} />
          <Optionbox image="nature" title="Nature" score={snature} />
          <Optionbox image="cartoon" title="Cartoons" score={scartoon} />
          <Optionbox image="comics" title="Comics" score={scomics} />
          <Optionbox image="geography" title="Geography" score={sgeography} />
          <Optionbox image="politics" title="Politics" score={spolitics} />
          <Optionbox
            image="mathematics"
            title="Mathematics"
            score={smathematics}
          />
          <Optionbox
            image="television"
            title="Television"
            score={stelevision}
          />
        </div>
      )}
    </div>
  )
}

export default home
