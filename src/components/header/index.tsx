import { useSelector } from 'react-redux';
import { ReduxStateType } from '../../types';
import './index.css';

type ChildrenType = {
  children: React.ReactNode
};

function Header({ children }: ChildrenType) {
  const { email } = useSelector((state:ReduxStateType) => state.user);

  const { expenses } = useSelector((state:ReduxStateType) => state.wallet);
  console.log(expenses);

  // implementar a lógica para calcular os gastos baseado na conversão de moeda
  const totalExpense = expenses.reduce((totalCost, actualCost) => {
    return totalCost
    + Number(actualCost.value)
    * Number(actualCost.exchangeRates[actualCost.currency].ask);
  }, 0);

  return (
    <body>
      <div className="fields-container">
        <h5 data-testid="total-field" className="field-cost">
          <span>Total de despesas: </span>
          {totalExpense.toFixed(2)}
        </h5>
        <h5 data-testid="header-currency-field" className="field-cost">BRL</h5>
        <h5 data-testid="email-field" className="field-email">{email}</h5>
        {children}
      </div>
    </body>
  );
}

export default Header;
