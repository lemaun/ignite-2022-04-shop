import { AppProps } from "next/app"
import Image from "next/future/image"
import { globalStyles } from "../styles/global"

import { CartProvider } from 'use-shopping-cart'

import { Container, Header } from "../styles/pages/app"
import logo from '../assets/logo.svg'
import { Cart } from "../components/Cart"
import Link from "next/link"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.STRIPE_SECRET_KEY!}
      successUrl={process.env.NEXT_URL_SUCCESS!}
      cancelUrl={process.env.NEXT_URL!}
      currency="BRL"
      allowedCountries={["US", "GB", "CA"]}
      billingAddressCollection={true}
      shouldPersist={true}
    >
      <Container>
        <Header>
          <Link href="/">
            <Image src={logo} alt="" />
          </Link>
          <Cart />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
