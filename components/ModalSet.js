import React from 'react'

function ModalSet({ modal }) {
  return (
    <div
      className="fixed top-0 left-0 h-[100vh] w-[100%] border-2 border-black bg-[#ffffff68]"
      onClick={() => {
        modal(false)
      }}
    >
      <div className=" fixed top-[50%] left-[50%] z-50 m-auto w-[90%] max-w-4xl translate-x-[-50%] translate-y-[-50%] transform rounded-lg border-2 border-black bg-black px-5 py-14 shadow-md ">
        <p className="w-[100%] px-5 font-serif text-[1.2rem] font-semibold italic tracking-wide text-slate-200 sm:text-[1.5rem] ">
          Are you sure , you want to log out !
        </p>

        <section className=" mt-10 flex w-[100%] items-center  justify-end ">
          <button
            className=" mx-2 rounded-lg bg-gradient-to-r  from-sky-500 to-indigo-500 px-6 py-2 text-center font-serif text-[1rem] italic tracking-wider text-white sm:mx-5 sm:px-10  sm:text-[1.2rem]"
            onClick={() => {
              modal(false)
            }}
          >
            Cancel
          </button>
          <button className=" mx-1 rounded-lg bg-gradient-to-r  from-sky-500 to-indigo-500 px-8 py-2 text-center font-serif text-[1rem] italic tracking-wider text-white sm:mx-5 sm:px-10  sm:text-[1.2rem] ">
            <a href="/login"> Okk</a>
          </button>
        </section>
      </div>
    </div>
  )
}

export default ModalSet
