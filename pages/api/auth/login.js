import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

const secret = process.env.SECRET

export default async function (req, res) {
  const { user, pass } = req.body

  if (user && pass) {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        username: user,
      },
      secret
    )

    const serialised = serialize('QuizApp', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    res.setHeader('Set-Cookie', serialised)

    res.status(200).json({ message: 'Success!' })
  } else {
    res.json({ message: 'Invalid credentials!' })
  }
}
