import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ProductContainer, ImageContainer, ProductDetails } from "../../styles/pages/product"
import axios from 'axios'
import { useState } from "react"
import Head from "next/head"

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product( { product }:ProductProps ) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl} = response.data

      window.location.href = checkoutUrl

    } catch (err) {
      // conectar com uma ferramenta de observalidade (Datadog / Sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <>
      <Head> {/*VER nextSEO*/ }
        <title>{product.name} | Ignite Shop</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>
          <p>{product.description}</p>
          <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{
      params: {id: 'prod_MYkRR2FM6yvG06'}
    }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => { //SSG
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'] //serve para expandir a busca e trazer dados do relacionamento do produto e preco
  })
  
  const price = product.default_price as Stripe.Price //forçando a tipagem do preco do produto

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, //1 horas para refazer a busca de produto no stripe
  }
}