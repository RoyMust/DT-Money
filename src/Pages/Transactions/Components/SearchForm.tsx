import styled from 'styled-components'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react';
import { TransactionsContext } from './../../../contexts/TransactionsContext';

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export default function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SearchFormInputs>()
  resolver: zodResolver(searchFormSchema)

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <Container onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder='Busque por transações'
        {...register('query')} />
      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass />
        {isSubmitting ? <span>Pesquisando</span> : <span>Pesquisar</span> }
      </button>
    </Container>
  )
}
const Container = styled.form`
  display: flex;
  margin-top: -1.5rem;
  gap: 1rem;

  input{
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${props => props.theme['gray-900']};
    color: ${props => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder{
      color: ${props => props.theme['gray-500']};
    }
  }
    button{
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: ${props => props.theme['green-300']};;

      border: 0;
      padding: 1rem;
      background: transparent;
      border: 1px solid ${props => props.theme['green-300']};
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;

      &:disabled{
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:not(:disabled):hover{
        border: 1px solid ${props => props.theme['green-500']};
        background-color: ${props => props.theme['green-500']};
        color: white;
        transition: 0.2s;
      }
    }
`