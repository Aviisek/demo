import '../styles/globals.css'
import {Nav} from "../components/Overlay";

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    </>
}

export default MyApp
