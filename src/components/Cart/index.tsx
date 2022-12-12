import * as Dialog from '@radix-ui/react-dialog'
import Image from "next/future/image"
import axios from 'axios';
import { useShoppingCart } from "use-shopping-cart";

import { Handbag, X } from "phosphor-react"
import { 
  CartIcon, 
  CartSummary,
  CheckoutButton, 
  CloseButton, 
  Content, 
  ImageContainer, 
  ProductDetails, 
  ProductItem, 
  ProductsList, 
  SummaryQtd, 
  SummaryTotal 
} from "./styles"

import Camiseta from "../../assets/camisetas/1.png"

export function Cart() {
  const { cartDetails, clearCart, removeItem } = useShoppingCart();

  const entries = [] as any[];

  for (const id in cartDetails) {
    const entry = cartDetails[id];
    entries.push(entry);
  }

  const price = entries.map((itens) => {
    return itens.price;
  });

  let total = 0;
  let formatPrice = '0';
  for (const prices of price) {
    formatPrice = prices.toString().replace("R$", "").replace(",", ".");
    console.log(Number(formatPrice));
    total = total + Number(formatPrice);
  }

  const formatTotal = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(total);

  async function handleBuyProduct() {
    try {
      const response = await axios.post("/api/checkout", {
        products: entries,
      });

      const { checkoutUrl } = response.data;

      clearCart();

      window.location.href = checkoutUrl;
    } catch (err) {
      // conectar com uma ferramenta de observabilidade (Datadog / Sentry)
      alert("Falha ao redirecionar para o checkout!");
    }
  }

  return (
    <Dialog.Root>

      <Dialog.Trigger asChild>
        <CartIcon>
          <span>{entries.length}</span>
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
            {entries.map((item) => {
                return (
                  <ProductItem key={item.id}>
                    <ImageContainer>
                      <Image src={item.imageUrl} width={120} height={100} alt="" />
                    </ImageContainer>
                    <ProductDetails>
                      <h3>{item.name}</h3>
                      <span>{item.price}</span>
                      <button onClick={() => removeItem(item.id)}>Remover</button>
                    </ProductDetails>
                  </ProductItem>
                );
            })}
            {/* <ProductItem>
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
            </ProductItem> */}

          </ProductsList>

          <CartSummary>
            <SummaryQtd>
              <p>Quantidade</p>
              <span>{entries.length} itens</span>
            </SummaryQtd>

            <SummaryTotal>
              <p>Valor total</p>
              <span>{formatTotal}</span>
            </SummaryTotal>

            <CheckoutButton
              onClick={handleBuyProduct}
            >
              Finalizar compra
            </CheckoutButton>
            
          </CartSummary>


        </Content>

      </Dialog.Portal>

    </Dialog.Root>
  )
}