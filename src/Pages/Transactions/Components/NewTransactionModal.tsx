import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { X, ArrowCircleUp, ArrowCircleDown } from 'phosphor-react';
import styled from 'styled-components';
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../lib/axlos';
import { useContext } from 'react';
import { TransactionsContext } from '../../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>


export default function NewTransactionModal() {

  const { createTransaction } = useContext(TransactionsContext)
  const { control, register, handleSubmit, formState: { isSubmitting }, reset } = useForm<NewTransactionFormInputs>({
    
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues:{
      type:'income'
    }
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data
    
    console.log(data)

    await createTransaction({
     description,
     price,
     category,
     type,
    })

    reset();
  }

  return (
    <div>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Close>
            <X size={24} />
          </Close>
          <Dialog.Title>Nova transação</Dialog.Title>
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              type="text"
              placeholder='Descrição'
              required
              {...register('description')} />
            <input
              type="number"
              placeholder='Preço'
              required
              {...register('price', { valueAsNumber: true })} />
            <input
              type="text"
              placeholder='Categoria'
              required
              {...register('category')} />

            <Controller
              control={control}
              name='type'
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant='income' value='income'>
                      <ArrowCircleUp size={24} />
                      Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant='outcome' value='outcome'>
                      <ArrowCircleDown size={24} />
                      Saida
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <button type='submit' disabled={isSubmitting}>
              Cadastrar
            </button>
          </form>
        </Content>
      </Dialog.Portal>
    </div>
  )
}

const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #000000b3;
  inset: 0;
`
const Content = styled(Dialog.Content)`
  min-width: 27rem;
  border-radius: 6px;
  padding: 2rem;
  background-color: ${props => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form{
    margin-top: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    input{
      border-radius: 6px;
      border: 0;
      background-color: ${props => props.theme['gray-900']};
      color: ${props => props.theme['gray-300']};
      padding: 0.9rem;

      &::placeholder{
        color: ${props => props.theme['gray-500']};
      }
    }
    button[type= "submit"]{
      height: 50px;
      border: 0;
      background: ${props => props.theme['green-500']};
      color: white;
      font-weight: bold;
      padding: 0 1rem;
      border-radius: 6px;
      margin-top: 1rem;
      cursor: pointer;

      &:disabled{
        opacity: 0.6;
        cursor: not-allowed;
      }
      &:not(:disabled):hover{
        background: ${props => props.theme['green-700']};
        transition: 0.2s;
      }
    }
  }
`
const Close = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme['gray-500']};
`
const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`
interface TransactionTypeButtonProps {
  variant: 'income' | 'outcome';
}

const TransactionTypeButton = styled(RadioGroup.Item) <TransactionTypeButtonProps>`
  background-color: ${props => props.theme['gray-700']};
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  border: 0;
  color: ${props => props.theme['gray-300']};

  &:focus{
    box-shadow: 0 0 0 2px  ${props => props.variant == 'income' ? props.theme['green-300'] : props.theme['red-300']};
  }
  svg{
    color: ${props => props.variant == 'income' ? props.theme['green-300'] : props.theme['red-300']}
  }
  &[data-state='checked'] {
    color: ${props => props.theme.white};
    background-color: ${props => props.variant == 'income' ? props.theme['green-500'] : props.theme['red-500']};

    svg{
      color: white;
    }
  }
`
