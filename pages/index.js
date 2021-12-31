import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Nav, Overlay} from "../components/Overlay";
import { Suspense } from "react"
import Canva from "../components/Canva";


export default function Home() {
  return (
    <>
      <Head>
        <title>Abhishek</title>
        <meta name="description" content="full stack software engineer" />
          <link
          rel="preload"
          href="/fonts/george-x-regular.woff2"
          as="font"
          crossOrigin=""
      />
          <link
              rel="preload"
              href="/fonts/george-x-regular.woff"
              as="font"
              crossOrigin=""
          />
      </Head>
      <main className={styles.main}>
          <Overlay/>
          <Suspense fallback={null}>
              <Canva />
          </Suspense>
      </main>
      <footer >
      </footer>
    </>
  )
}
