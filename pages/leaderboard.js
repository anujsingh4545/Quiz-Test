import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { GiTrophy } from 'react-icons/gi'
import Lists from '../components/Lists'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setLogLevel,
} from 'firebase/firestore'
import { db } from '../firebase'
// import { BallTriangle } from 'react-loader-spinner'
import HeaderHome from '../components/HeaderHome'

function leaderboard() {
  const [ranks, setRanks] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')
  let rankings = useRef(null)

  let run = 0,
    indexs = 0

  useEffect(async () => {
    let leadsFromLocalStorage = await JSON.parse(
      localStorage.getItem('USERNAME')
    )
    if (leadsFromLocalStorage) {
      await setUser(leadsFromLocalStorage)
    }
  }, [db])

  if (run === 0) {
    useEffect(async () => {
      setLoading(true)
      const unsubscribe = await onSnapshot(
        query(collection(db, 'Total'), orderBy('score', 'desc')),
        (snapshot) => {
          setRanks(snapshot.docs)
          setLoading(false)
        }
      )
      run = 1
      return unsubscribe
    }, [])
  }

  const changeOption = async () => {
    setLoading(true)
    await onSnapshot(
      query(collection(db, rankings.current.value), orderBy('score', 'desc')),
      (snapshot) => {
        setRanks(snapshot.docs)
        setLoading(false)
      }
    )
  }

  return (
    <div>
      {user.length > 0 ? <HeaderHome /> : <Header />}

      <section className="m-auto mt-36 h-60 w-[100%] max-w-[100rem] border-0 border-black">
        {/*  */}

        <h1 className="m-auto flex w-fit items-center  justify-center rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-14 py-3 text-[1.8rem] font-semibold tracking-wide text-white md:text-[2.8rem] ">
          <GiTrophy className="mr-5 text-[2rem] text-white md:text-[2.5rem]" />
          TOP 50 PLAYERS
          <GiTrophy className="ml-5 text-[2rem] text-white md:text-[2.5rem]" />
        </h1>

        <section className=" mt-6 flex w-[100%] items-center justify-end px-2   md:mt-5 ">
          <select
            ref={rankings}
            className="rounded-md py-3 px-2  font-serif text-[1.4rem] font-medium  italic  outline-none  sm:text-[1.5rem]  md:px-5 "
            onChange={changeOption}
          >
            <option value="Total">Total</option>
            <option value="Computers">Computers</option>
            <option value="Sports">Sports</option>
            <option value="History">History</option>
            <option value="Nature">Nature</option>
            <option value="Cartoons">Cartoons</option>
            <option value="Comics">Comics</option>
            <option value="Geography">Geography</option>
            <option value="Politics">Politics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Television">Television</option>
          </select>
        </section>

        <div className=" my-10 flex w-[100%] flex-col items-center  px-2 py-10 md:my-14 ">
          {/*  */}

          <div className="flex w-[100%] items-center  bg-white shadow-md ">
            <p className=" w-[20%] border-[0.1rem] border-slate-200 py-4  px-4 text-left font-serif text-[1.3rem] font-semibold  tracking-wide text-slate-800 sm:text-[1.6rem] ">
              Position
            </p>
            <p className=" w-[63%] border-[0.1rem] border-slate-200 py-4  px-4 text-left font-serif text-[1.3rem] font-semibold tracking-wide text-slate-800  md:text-[1.6rem]">
              Username
            </p>
            <p className=" w-[17%] border-[0.1rem] border-slate-200 py-4  px-4 text-left font-serif text-[1.3rem] font-semibold tracking-wide text-slate-800 md:text-[1.6rem] ">
              Score
            </p>
          </div>

          {loading ? (
            <div className=" mt-28  flex h-fit w-[100%] items-center justify-center">
              {/* <BallTriangle color="#00BFFF" height={80} width={80} /> */}
            </div>
          ) : ranks.length <= 0 ? (
            <p className="mt-20 w-[100%] text-center font-serif text-[1.5rem] font-medium italic tracking-wider text-black sm:text-[2rem] ">
              No data found 😐
            </p>
          ) : (
            ranks.map((datas, index) => (
              <Lists
                key={index}
                index={++indexs}
                username={datas.data().username}
                score={datas.data().score}
              />
            ))
          )}

          {/*  */}
        </div>

        {/*  */}
      </section>
    </div>
  )
}

export default leaderboard
