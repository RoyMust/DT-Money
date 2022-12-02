import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './global/themes/default';
import { GlobalStyle } from './global/themes/GlobalStyles';
import Transactions from './Pages/Transactions/Transactions';
import { TransactionsProvider } from './contexts/TransactionsContext';

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
      <GlobalStyle />
    </ThemeProvider>

  )
}
