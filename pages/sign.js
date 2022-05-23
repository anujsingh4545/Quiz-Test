import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import Header from '../components/Header'

import { db } from '../firebase'

function sign() {
  let username = useRef(null)
  let firstname = useRef(null)
  let lastname = useRef(null)
  let email = useRef(null)
  let password = useRef(null)
  let Pconfirmation = useRef(null)

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const submitRequest = async () => {
    if (loading) return

    setLoading(true)

    if (
      username.current.value === '' ||
      firstname.current.value === '' ||
      lastname.current.value === '' ||
      email.current.value === '' ||
      password.current.value === '' ||
      Pconfirmation.current.value === ''
    ) {
      alert('Empty fields are not allowed ⚠️')
      setLoading(false)
    } else if (username.current.value.includes(' ')) {
      alert("Username can't contain spaces ⚠️")
      setLoading(false)
    } else if (!email.current.value.includes('@gmail.com')) {
      alert('Email not valid ⚠️')
      setLoading(false)
    } else if (password.current.value.length < 8) {
      alert("Password length can't be less than 8 ⚠️")
      setLoading(false)
    } else if (Pconfirmation.current.value != password.current.value) {
      alert("Passwords didn't match ⚠️")
      setLoading(false)
    } else {
      const docRef = doc(db, 'userlist', username.current.value) // getting user data from firebase
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        alert('Username already exists ☹️')
        setLoading(false)
      } else {
        const userdata = {
          username: username.current.value,
          Fname: firstname.current.value,
          Lname: lastname.current.value,
          email: email.current.value,
          password: password.current.value,
          Cpassword: Pconfirmation.current.value,
        }
        await setDoc(doc(db, 'userlist', username.current.value), userdata)
        await setDoc(doc(db, 'Computers', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Sports', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'History', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Nature', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Cartoons', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Comics', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Geography', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Politics', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Mathematics', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Television', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })
        await setDoc(doc(db, 'Total', username.current.value), {
          username: username.current.value,
          score: 0.0,
        })

        username.current.value = ''
        firstname.current.value = ''
        lastname.current.value = ''
        email.current.value = ''
        password.current.value = ''
        Pconfirmation.current.value = ''
        setLoading(false)

        alert('Account created 🙂')
        router.replace('/login')
      }
    }
  }

  return (
    <div>
      <Header />

      <section className="m-auto mt-32  w-[100%] max-w-3xl ">
        {/*  */}

        <h1 className="w-[100%] text-center font-serif text-[3rem] font-medium tracking-wide text-black md:text-[4.2rem]">
          Create a new account
        </h1>

        <div className="mt-16 flex w-[100%] flex-col items-center justify-start px-3 ">
          {/*  */}

          <section className="flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              Username*
            </p>

            <input
              ref={username}
              type="text"
              className="my-4 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />

            <p className="font-serif text-[1rem] text-[#777]  sm:text-[1.2rem]">
              Required. 150 characters or fewer. Letters, digits and @/./+/-/_
              only.
            </p>
          </section>

          <section className=" mt-8 flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              First name*
            </p>

            <input
              ref={firstname}
              type="text"
              className="my-3 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />
          </section>

          <section className=" mt-8 flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              Last name*
            </p>

            <input
              ref={lastname}
              type="text"
              className="my-3 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />
          </section>

          <section className=" mt-8 flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              Email*
            </p>

            <input
              ref={email}
              type="text"
              className="my-3 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />
          </section>

          <section className=" mt-8 flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              Password*
            </p>

            <input
              ref={password}
              type="password"
              className="my-4 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />

            <p className="pl-5 font-serif text-[1rem]  text-[#777] sm:text-[1.2rem]">
              1. Your password can't be too similar to your other personal
              information. <br />
              2. Your password must contain at least 8 characters.
              <br />
              3. Your password can't be a commonly used password.
              <br />
              4. Your password can't be entirely numeric.
              <br />
            </p>
          </section>

          <section className="mt-8 flex w-[100%]  flex-col justify-start">
            <p className="font-serif text-[1.6rem] tracking-wide text-black">
              Password Confirmation*
            </p>

            <input
              ref={Pconfirmation}
              type="password"
              className="my-4 w-[100%] rounded-lg bg-white px-5 py-3 text-[1.5rem] text-slate-700 shadow-md outline-none "
            />

            <p className="font-serif text-[1rem] text-[#777]  sm:text-[1.2rem]">
              Enter the same password as before, for verification.
            </p>
          </section>

          <button
            className="mt-10  w-[100%] rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-center font-serif text-[1.7rem] italic tracking-wider  text-white "
            onClick={submitRequest}
          >
            {loading ? 'Loading...' : 'Create Account'}
          </button>

          <p className="my-5 w-[100%] text-center font-serif text-[1.6rem] tracking-wide text-black ">
            or
          </p>

          <a
            href="/login"
            className=" mb-10  w-[100%] rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 py-3 text-center font-serif text-[1.7rem] italic tracking-wider  text-white "
          >
            Log in
          </a>

          {/*  */}
        </div>

        {/*  */}
      </section>
    </div>
  )
}

export default sign
