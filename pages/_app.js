import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Head>
        <title>Quiz App </title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
