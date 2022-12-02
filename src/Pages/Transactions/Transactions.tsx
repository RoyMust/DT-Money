import { useContext,} from 'react'
import styled from 'styled-components';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import Header from './Components/Header';
import SearchForm from './Components/SearchForm';
import Summary from './Components/Summary';

export default function Transactions() {
  const { transactions } = useContext(TransactionsContext)

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width='40%'>{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.type == 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}
const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 57rem;
  margin: 3.7rem auto 0;
  padding: 0 1.4rem;
`
const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 0.7rem;

  td{
    padding: 1rem 2rem;
    background-color: ${props => props.theme['gray-700']} ;

    &:first-child{
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child{
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  
  `
interface PriceHighLightProps {
  variant: 'income' | 'outcome';
}

const PriceHightLight = styled.span<PriceHighLightProps>`
  color: ${props => props.variant == 'income' ? props => props.theme['green-300'] : props => props.theme['red-300']};
`