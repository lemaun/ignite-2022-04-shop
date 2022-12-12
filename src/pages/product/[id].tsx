import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image"
import Stripe from "stripe"
import { stripe } from "../../lib/stripe"
import { ProductContainer, ImageContainer, ProductDetails } from "../../styles/pages/product"
import axios from 'axios'
import { useState } from "react"
import { useShoppingCart } from "use-shopping-cart";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";
import Head from "next/head"
import { useRouter } from "next/router"

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
  
  const { isFallback } = useRouter();
  const { addItem, cartDetails } = useShoppingCart()
  const entries = [] as any[];

  for (const id in cartDetails) {
    const entry = cartDetails[id];
    entries.push(entry);
  }

  function handlerAddProduct(product: any) {
    const existProduct = entries.filter((element) => element.id === product.id);
    if (existProduct.length > 0) {
      return toast.warning("Já existe esse produto no carrinho!");
    }

    addItem(product);

    toast.success("Produto adicionado no carrinho!");
  }

  if (isFallback) {
    return (
      <>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <ProductContainer>
            <Skeleton width={576} height={656} />

            <ProductDetails>
              <Skeleton height={40} />
              <div>
                <Skeleton width={100} />
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <Skeleton count={4} />
              </div>

              <div
                style={{
                  marginTop: "auto",
                }}
              >
                <Skeleton height={60} />
              </div>
            </ProductDetails>
          </ProductContainer>
        </SkeletonTheme>
      </>
    );
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
          <button onClick={() => handlerAddProduct(product)}>Colocar na sacola</button>
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
    fallback: true,
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