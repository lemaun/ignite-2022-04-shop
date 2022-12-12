import { styled } from "."

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$grey100',
  },

  p: {
    fontSize: '$xl',
    color: '$grey300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  height: 140,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '4rem',
  paddingLeft: '50px',
})
export const ImageItem = styled('div', {
  width: '100%',
  maxWidth: 140,
  height: 140,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 999,
  padding: '0.25rem',
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginLeft: '-50px',

  boxShadow: '-10px 0 10px rgba(0, 0, 0, 0.3)',

  img: {
    objectFit: 'cover',
  }

})