import * as Dialog from '@radix-ui/react-dialog';
import styled from 'styled-components'
import LogoPNG from '../../../assets/Logo.png'
import NewTransactionModal from './NewTransactionModal';

export default function () {
  return (
    <Container>
      <HeaderContent>
        <Logo>
          <img src={LogoPNG} />
          <span>DT Money</span>
        </Logo>
        <Dialog.Root>
          <NewTransactionModal />
          <Dialog.Trigger asChild>
            <Button> Nova transação </Button>
          </Dialog.Trigger>
        </Dialog.Root>
      </HeaderContent>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${props => props.theme['gray-900']};
  padding: 1.5rem 0 7rem;
`
const HeaderContent = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 57rem;
  margin: 0 auto;
  padding: 0 1.5rem;
`
const Logo = styled.div`
  display: flex;
  align-items: center;
`
const Button = styled.button`
  background-color: ${props => props.theme['green-500']};
  height: 40px;
  border: 0;
  font-weight: bold;
  color: white;
  padding: 0 0.7rem;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s;

  &:hover{
    background-color: ${props => props.theme['green-700']};

  }
`
