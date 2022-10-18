import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import Image from "next/future/image"

import { CartIcon, Container, Header } from "../styles/pages/app"
import logo from '../assets/logo.svg'
import { Handbag } from "phosphor-react"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Container>
      <Header>
        <Image src={logo} alt="" />
        <CartIcon>
          <Handbag size={24}/>
        </CartIcon>
      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
