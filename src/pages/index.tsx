import Image from "next/future/image"
import Head from 'next/head'
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { useKeenSlider } from 'keen-slider/react'
import { GetServerSideProps, GetStaticProps } from "next"

import { HomeContainer, Product } from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'
import Link from "next/link"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    }
  })

  return (
    <>
      <Head> {/*VER nextSEO*/ }
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

//export const getServerSideProps: GetServerSideProps = async () => { //SSR -> executa em cada execução da página
export const getStaticProps: GetStaticProps = async () => { //SSG
  const response = await stripe.products.list({
    expand: ['data.default_price'] //serve para expandir a busca e trazer dados do relacionamento do produto e preco
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price //forçando a tipagem do preco do produto

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  })

  // console.log(response.data)

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, //2 horas para refazer a busca de produto no stripe
  }
}