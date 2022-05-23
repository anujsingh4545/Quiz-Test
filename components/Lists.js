import React from 'react'

function Lists({ index, username, score }) {
  if (index > 50) {
    return null
  }

  return (
    <div
      className={
        index % 2 != 0
          ? 'flex w-[100%] items-center  bg-gray-200 shadow-md'
          : 'flex w-[100%] items-center  bg-white shadow-md'
      }
    >
      <p className=" w-[20%] border-[0.1rem] border-slate-300 py-4  px-4 text-left font-serif text-[1.3rem] font-medium text-slate-700 md:text-[1.6rem] ">
        {index}
      </p>
      <p className=" w-[63%] border-[0.1rem] border-slate-300 py-4  px-4 text-left font-serif text-[1.3rem] font-medium tracking-wide text-slate-700 md:text-[1.6rem] ">
        {username}
      </p>
      <p className=" w-[17%] border-[0.1rem] border-slate-300 py-4  px-4 text-left font-serif text-[1.3rem] font-medium text-slate-700 md:text-[1.6rem] ">
        {score}
      </p>
    </div>
  )
}

export default Lists
