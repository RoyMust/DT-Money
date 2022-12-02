import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'
import { priceFormatter } from '../../../utils/formatter';
import { useSummary } from '../../../hooks/useSummary';

export default function Summary() {
  const summary = useSummary();

  return (
    <Container>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saindas</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>
      <SummaryCard variant='green'>
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#fff' />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </Container>
  )
}
const Container = styled.div`
  width: 100%;
  max-width: 57rem;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -5rem;
`
interface SummaryCardProps {
  variant?: 'green'
}

const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${props => props.theme['gray-600']};
  border-radius: 6px;
  padding: 1.2rem;
    header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${props => props.theme['gray-300']};
    }
    strong{
      display: block;
      margin-top: 1rem;
      font-size: 1.35rem;
    }
    ${props => props.variant === 'green' && css`
      background: ${props.theme['green-700']};
    `}
`