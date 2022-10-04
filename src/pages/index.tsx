import { styled } from "../styles"

const Button = styled('button', {
  backgroundColor: "$green500",
  borderRadius: 2,
  border: 0,
  padding: '4px 8px'
})

export default function Home() {
  return (
    <Button>Hello World</Button>
  )
}
