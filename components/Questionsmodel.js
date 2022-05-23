import React, { useEffect, useState } from 'react'
import { FaDatabase } from 'react-icons/fa'
import { BiArrowBack } from 'react-icons/bi'
import { BallTriangle } from 'react-loader-spinner'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

function Questionsmodel({ modal, topic, username }) {
  const [Question, setQuestion] = useState('')
  const [options, setOptions] = useState([])
  const [RAnswer, setRAnswer] = useState('')
  const [loading, setLoading] = useState('')
  const [option1, setoption1] = useState('')
  const [option2, setoption2] = useState('')
  const [option3, setoption3] = useState('')
  const [option4, setoption4] = useState('')
  const [loader, setLoader] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [close, setClose] = useState(false)
  const [answer, setAnswer] = useState('')
  const [errors, setErrors] = useState(false)
  const [score, setScore] = useState(0)

  let first = 0

  useEffect(async () => {
    const docRef = doc(db, topic, username) // getting user data from firebase
    const docSnap = await getDoc(docRef)
    setScore(docSnap.data().score)
  }),
    [db, close]

  if (first === 0) {
    useEffect(async () => {
      setLoading(true)

      let title

      console.log(topic)

      if (topic === 'Computers') {
        title = '18'
      }
      if (topic === 'Sports') {
        title = '21'
      }
      if (topic === 'History') {
        title = '23'
      }
      if (topic === 'Nature') {
        title = '17'
      }
      if (topic === 'Cartoons') {
        title = '32'
      }
      if (topic === 'Comics') {
        title = '29'
      }
      if (topic === 'Geography') {
        title = '22'
      }
      if (topic === 'Politics') {
        title = '24'
      }
      if (topic === 'Mathematics') {
        title = '19'
      }
      if (topic === 'Television') {
        title = '14'
      }

      fetch(
        `https://opentdb.com/api.php?amount=1&category=${title}&type=multiple`
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setQuestion(result.results[0].question)
            let array = [...result.results[0].incorrect_answers]
            array.push(result.results[0].correct_answer)
            array = shuffle(array)
            setOptions(array)
            setRAnswer(result.results[0].correct_answer)

            setLoading(false)
          },

          (error) => {
            setErrors(true)
            setLoading(false)
          }
        )
    }, [])

    first = 1
  }

  function shuffle(arra1) {
    var ctr = arra1.length,
      temp,
      index

    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr)

      ctr--

      temp = arra1[ctr]
      arra1[ctr] = arra1[index]
      arra1[index] = temp
    }
    return arra1
  }

  console.log(RAnswer)

  const submitquiz = async () => {
    if (loader) {
      return
    }
    setLoader(true)
    setClose(true)

    if (option1.length > 0) {
      setAnswer(option1)
    } else if (option2.length > 0) {
      setAnswer(option2)
    } else if (option3.length > 0) {
      setAnswer(option3)
    } else if (option4.length > 0) {
      setAnswer(option4)
    } else {
      setAnswer('Not answered ⚠️')
    }

    let ans = false

    if ((option1 === '' && option2 === '', option3 === '', option4 === '')) {
      setCorrect(false)
      ans = false
      setLoader(false)
    }
    if (option1 === RAnswer) {
      setCorrect(true)
      ans = true
      setLoader(false)
    } else if (option2 === RAnswer) {
      setCorrect(true)
      ans = true
      setLoader(false)
    } else if (option3 === RAnswer) {
      setCorrect(true)
      ans = true
      setLoader(false)
    } else if (option4 === RAnswer) {
      setCorrect(true)
      ans = true
      setLoader(false)
    } else {
      setCorrect(false)
      ans = false
      setLoader(false)
    }

    await updateScore(ans)
  }

  const updateScore = async (ans) => {
    if (ans === true) {
      let AbsenterScore = 0
      const docRef = doc(db, topic, username) // getting user data from firebase
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        AbsenterScore = docSnap.data().score
      }
      await updateDoc(docRef, {
        score: AbsenterScore + 4.0, //Adding +4 if user gives right answer
      })

      let AbsenterScore1 = 0
      const docRef1 = doc(db, 'Total', username) // getting user data from firebase
      const docSnap1 = await getDoc(docRef1)
      if (docSnap1.exists()) {
        AbsenterScore1 = docSnap1.data().score
        console.log(AbsenterScore1)
      }
      await updateDoc(docRef1, {
        score: AbsenterScore1 + 4.0, //Adding +4 if user gives right answer
      })
    } else {
      let AbsenterScore = 0
      const docRef = doc(db, topic, username) // getting user data from firebase
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        AbsenterScore = docSnap.data().score
      }
      await updateDoc(docRef, {
        score: AbsenterScore - 4.0, //Subtracting -4 if user gives wrong answer
      })

      let AbsenterScore1 = 0
      const docRef1 = doc(db, 'Total', username) // getting user data from firebase
      const docSnap1 = await getDoc(docRef1)
      if (docSnap1.exists()) {
        AbsenterScore1 = docSnap1.data().score
      }
      await updateDoc(docRef1, {
        score: AbsenterScore1 - 4.0, //Adding -4 if user gives wrong answer
      })
    }
  }

  function clearMarks() {
    setoption1('')
    setoption2('')
    setoption3('')
    setoption4('')
  }

  function showNext() {
    setLoading(true)
    let title

    if (topic === 'Computers') {
      title = '18'
    }
    if (topic === 'Sports') {
      title = '21'
    }
    if (topic === 'History') {
      title = '23'
    }
    if (topic === 'Nature') {
      title = '17'
    }
    if (topic === 'Cartoons') {
      title = '32'
    }
    if (topic === 'Comics') {
      title = '29'
    }
    if (topic === 'Geography') {
      title = '22'
    }
    if (topic === 'Politics') {
      title = '24'
    }
    if (topic === 'Mathematics') {
      title = '19'
    }
    if (topic === 'Television') {
      title = '14'
    }

    fetch(
      `https://opentdb.com/api.php?amount=1&category=${title}&type=multiple`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setQuestion(result.results[0].question)
          let array = [...result.results[0].incorrect_answers]
          array.push(result.results[0].correct_answer)
          array = shuffle(array)
          setOptions(array)
          setRAnswer(result.results[0].correct_answer)

          setLoading(false)
        },

        (error) => {
          setErrors(true)
          setLoading(false)
        }
      )

    setClose(false)
  }

  const Options = ({ text, option, answer }) => (
    <button
      className={
        answer === text
          ? 'my-5 w-[100%] cursor-pointer rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 px-5  py-5 text-left text-[1.5rem]  font-medium italic text-slate-100 shadow-sm shadow-[#ffffffa9] selection:bg-gradient-to-r hover:bg-gradient-to-r '
          : 'my-5 w-[100%] cursor-pointer rounded-md bg-[#7c7c7c2b] from-sky-500 to-indigo-500 px-5  py-5 text-left text-[1.5rem]  font-medium italic text-slate-100 shadow-sm shadow-[#ffffffa9] selection:bg-gradient-to-r hover:bg-gradient-to-r'
      }
      onClick={() => {
        setoption1('')
        setoption2('')
        setoption3('')
        setoption4('')
        option(text)
      }}
    >
      {text}
    </button>
  )

  return (
    <div className=" h-[100vh] w-[100vw]  bg-[url('/big.jpg')]">
      <div className="m-auto  h-[100%] w-[100%] max-w-7xl bg-black    bg-cover bg-no-repeat shadow-xl shadow-[#ffffffa9] ">
        {loading ? (
          <div className=" flex h-[100%]   w-[100%] max-w-7xl items-center justify-center">
            <BallTriangle color="#00BFFF" height={80} width={80} />
          </div>
        ) : errors ? (
          <div className="absolute top-[50%] left-[50%]  w-[100%] max-w-7xl translate-x-[-50%] translate-y-[-50%] transform  ">
            <img src="/not_found.svg" alt="" className=" m-auto w-[60%]  " />

            <p className=" mt-24 w-[100%] px-5  text-center text-[1.6rem] font-medium italic tracking-wider  text-slate-300 ">
              Some eroor occured☹️, refresh tab to continue !
            </p>
          </div>
        ) : (
          <>
            <section className="flex w-[100%] items-center justify-between  border-b-[0.1rem] border-slate-800 bg-[#7c7c7c2b] px-5 py-5  ">
              <BiArrowBack
                className="cursor-pointer text-[2rem]  text-slate-200"
                onClick={() => {
                  modal(false)
                }}
              />

              <p className="flex items-center font-serif text-[1.5rem] font-medium italic tracking-wide  text-slate-200 ">
                <FaDatabase className="mr-4 text-[1.3rem] text-red-600  " />
                {score}
              </p>
            </section>

            <section className="mt-10 w-[100%] px-5 py-10 sm:px-10  ">
              <p className=" text-[2rem] font-medium italic  tracking-wider text-sky-500  ">
                {Question}
              </p>

              {close ? (
                <div className="mt-2 w-[100%] py-2 ">
                  <p className="font-serif text-[1.5rem] font-medium tracking-wide text-slate-200   ">
                    Your Answer :
                    <span className="italic text-[#777]"> {answer}</span>
                  </p>
                  <p className="mt-1 font-serif text-[1.5rem] font-medium tracking-wide text-slate-200   ">
                    Correct Answer :
                    <span className="italic text-[#777]"> {RAnswer}</span>
                  </p>

                  {correct ? (
                    <p className=" mt-14 font-serif text-[2rem] font-medium tracking-wider text-green-600 md:text-[2.2rem] ">
                      Yayy!! Your answer is correct. High Five! 🙌
                    </p>
                  ) : (
                    <p className=" mt-14 font-serif text-[2rem]  font-medium tracking-wider text-red-600 md:text-[2.2rem] ">
                      Your answer is incorrect 😟
                    </p>
                  )}

                  <button
                    className=" mt-7  w-fit rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-10 text-center font-serif text-[1.3rem] italic tracking-wider text-white  md:py-3 md:px-20 "
                    onClick={showNext}
                  >
                    Show next question
                  </button>
                </div>
              ) : (
                <>
                  <div className=" mt-10 flex flex-wrap">
                    <Options
                      text={options[0]}
                      option={setoption1}
                      answer={option1}
                    />
                    <Options
                      text={options[1]}
                      option={setoption2}
                      answer={option2}
                    />
                    <Options
                      text={options[2]}
                      option={setoption3}
                      answer={option3}
                    />
                    <Options
                      text={options[3]}
                      option={setoption4}
                      answer={option4}
                    />
                  </div>

                  <div className="mt-10 flex items-center justify-end ">
                    <button
                      className="   mx-10 w-fit rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-10 text-center font-serif text-[1.3rem] italic tracking-wider text-white  md:py-3 md:px-20 "
                      onClick={clearMarks}
                    >
                      Clear
                    </button>
                    <button
                      className="   w-fit rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-2 px-10 text-center font-serif text-[1.3rem] italic tracking-wider text-white md:py-3  md:px-20"
                      onClick={submitquiz}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default Questionsmodel
