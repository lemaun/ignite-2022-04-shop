import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImageItem, SuccessContainer } from "../styles/success";

interface SuccessProps {
  customerName: string
  productImageList: string[]
}

export default function Success({ customerName, productImageList }: SuccessProps) {
  return (
    <>
      <Head> {/*VER nextSEO*/ }
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ImageContainer>

          { productImageList.map((image, index) => {
            return (
              <ImageItem key={index}>
                <Image src={image} width={120} height={110} alt="" />
              </ImageItem>
            )
          }) }
        </ImageContainer>
        <p>Uhuul <strong>{customerName}</strong>, sua compra de <strong>{productImageList.length} camiseta(s)</strong> já está a caminho da sua casa.</p>
        
        <Link href="/">
          Voltar ao catálago
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps:  GetServerSideProps = async ({ query }) => {
  
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const productImageList = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product;
    return product.images[0];
  });

  // const product = session.line_items.data[0].price.product as Stripe.Product

  return {
    props: {
      customerName,
      productImageList,
      // product: {
      //   name: product.name,
      //   imageUrl: product.images[0],
      // }
    }
  }
}