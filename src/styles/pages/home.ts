import { styled } from ".."

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - (100vw - 1180px)/2)',
  minHeight: 656,
  
})

export const Product = styled('a', {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  img: { 
    objectFit: 'cover',
    cursor: 'pointer',
  },

  overflow: 'hidden',

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      cursor: 'pointer',

      strong: {
        fontSize: '$lg',
        lineHeight: '160%',
      },
      
      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
        lineHeight: '140%',
      },
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
    }
  }
})

export const AddToCart = styled('button', {
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$green500',
  borderRadius: 8,
  transition: 'all 0.2s',
  color: 'white',
  borderColor: 'transparent',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: '$green300',
  }
})