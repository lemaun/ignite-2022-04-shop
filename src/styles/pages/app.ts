import * as Dialog from '@radix-ui/react-dialog'
import {styled} from '..'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const Header = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
})

export const CartIcon = styled('div', {
  position: 'relative',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$gray800',
  borderRadius: 8,
  transition: 'all 0.2s',
  cursor: 'pointer',
  color: '$gray500',

  // '&:hover': {
  //   backgroundColor: '$green500',
  // }

  'span': {
    display: 'flex',
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderRadius: '999px',
    outline: '3px solid $gray900',
    backgroundColor: '$green300',
    color: '$white',
    fontSize: '0.875rem',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export const Content = styled(Dialog.Overlay, {
  display: 'flex',
  flexDirection: 'column',

  minWidth: '30rem',
  height: '100vh',
  padding: '3rem',
  background: '$gray800',

  position: 'fixed',
  top: 0,
  right: 0,

  fontWeight: 700,

  'h2': {
    fontSize: '1.25rem',
    lineHeight: '160%',
    color: '$gray100',
  }
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray500',
})

export const ProductsList = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1.5rem',
  margin: '2rem 0',
})

export const ProductItem = styled('div', {
  display: 'flex',
  width: '100%',
  gap: '1.25rem',
})

export const ImageContainer = styled('div', {
  maxWidth: 100,
  height: 92,
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})

export const ProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'baseline',

  'h3': {
    fontSize: '$md',
    color: '$gray300',
    fontWeight: 'normal',
  },

  'span': {
    fontSize: '$md',
    color: '$gray100',
    fontWeight: 'bold',
  },

  'button': {
    backgroundColor: 'transparent',
    border: 0,
    color: '$green500',
    cursor: 'pointer',
    fontWeight: 'bold',
  }

})
export const CartSummary = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginTop: 'auto',
})

export const SummaryQtd = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'p': {
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  'span': {
    fontSize: '$md',
    fontWeight: 'normal',
  }
})

export const SummaryTotal = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  'p': {
    fontSize: '$md',
    fontWeight: 'bold',
  },

  'span': {
    fontSize: '$xl',
    fontWeight: 'bold',
  }
})

export const CheckoutButton = styled('button', {
  width: '100%',
  border: 0,
  borderRadius: '6px',
  background: '$green300',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$md',
  padding: '1.25rem 0',
  marginTop: '3rem',
  cursor: 'pointer',

  transition: 'background-color 0.2s',

  '&:disabled': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },

  '&:not(:disabled):hover': {
    background: '$green500',
  }
})
