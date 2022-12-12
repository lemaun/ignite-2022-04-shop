import Image from "next/future/image"
import Head from 'next/head'
import { stripe } from "../lib/stripe"
import Stripe from "stripe"
import { useKeenSlider } from 'keen-slider/react'
import { GetServerSideProps, GetStaticProps } from "next"
import {Handbag} from 'phosphor-react'
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";

import { AddToCart, HomeContainer, Product } from '../styles/pages/home'

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
            <Product key={product.id} className="keen-slider__slide">
                <Link href={`/product/${product.id}`} prefetch={false}>
                  <Image src={product.imageUrl} width={520} height={480} alt="" />
                </Link>

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  
                  <AddToCart onClick={() => handlerAddProduct(product)}>
                    <Handbag size={32}/>
                  </AddToCart>
                  
                </footer>
              </Product>
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