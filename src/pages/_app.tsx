import { AppProps } from "next/app"
import Image from "next/future/image"
import { globalStyles } from "../styles/global"

import * as Dialog from '@radix-ui/react-dialog'

import { Handbag, X } from "phosphor-react"
import { CartIcon, CartSummary, CheckoutButton, CloseButton, Container, Content, Header, ImageContainer, ProductDetails, ProductItem, ProductsList, SummaryQtd, SummaryTotal } from "../styles/pages/app"
import Camiseta from "../assets/camisetas/1.png"
import logo from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <Container>
      <Header>
        <Image src={logo} alt="" />

        <Dialog.Root>

          <Dialog.Trigger asChild>
            <CartIcon>
              <span>1</span>
              <Handbag size={24}/>
            </CartIcon>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Content>
              <CloseButton>
                <X size={24} weight="bold"/>
              </CloseButton>
              
              <Dialog.Title>Sacola de compras</Dialog.Title>

              <ProductsList>
                <ProductItem>
                  <ImageContainer>
                    <Image src={Camiseta} width={120} height={100} alt="" />
                  </ImageContainer>
                  <ProductDetails>
                    <h3>Camiseta Beyond the Limits</h3>
                    <span>R$ 79,90</span>
                    <button>Remover</button>
                  </ProductDetails>
                </ProductItem>

                <ProductItem>
                  <ImageContainer>
                    <Image src={Camiseta} width={120} height={100} alt="" />
                  </ImageContainer>
                  <ProductDetails>
                    <h3>Camiseta Beyond the Limits</h3>
                    <span>R$ 79,90</span>
                    <button>Remover</button>
                  </ProductDetails>
                </ProductItem>

                <ProductItem>
                  <ImageContainer>
                    <Image src={Camiseta} width={120} height={100} alt="" />
                  </ImageContainer>
                  <ProductDetails>
                    <h3>Camiseta Beyond the Limits</h3>
                    <span>R$ 79,90</span>
                    <button>Remover</button>
                  </ProductDetails>
                </ProductItem>

              </ProductsList>

              <CartSummary>
                <SummaryQtd>
                  <p>Quantidade</p>
                  <span>3 itens</span>
                </SummaryQtd>

                <SummaryTotal>
                  <p>Valor total</p>
                  <span>R$ 270,00</span>
                </SummaryTotal>

                <CheckoutButton
                
                >
                  Finalizar compra
                </CheckoutButton>
                
              </CartSummary>


            </Content>

          </Dialog.Portal>

        </Dialog.Root>

      </Header>
      <Component {...pageProps} />
    </Container>
  )
}
