import { serialize } from 'cookie'

export default async function (req, res) {
  const { cookies } = req

  const jwt = cookies.QuizApp

  if (!jwt) {
    return res.json({ message: 'Bro you are already not logged in...' })
  } else {
    const serialised = serialize('QuizApp', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'Lax',
      maxAge: -1,
      path: '/',
    })

    res.setHeader('Set-Cookie', serialised)

    res.status(200).json({ message: 'Successfuly logged out!' })
  }
}
