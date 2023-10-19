import { useSelector, useDispatch } from 'react-redux';
import { ReduxStateType, DispatchType, ExpenseList } from '../../types';
import { walletUpdate } from '../../redux/actions';
import './index.css';

type TableStatusType = { changeStatus :(x:boolean) => void, getID: (x:string) => void };

function Table({ changeStatus, getID }:TableStatusType) {
  const { expenses } = useSelector((state:ReduxStateType) => state.wallet);

  const INITIAL_FORM = {
    id: '0',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  const dispatch:DispatchType = useDispatch();

  const handleClick = (id:string) => {
    const filteredExpense = expenses.filter((expense) => expense.id !== id);
    dispatch(walletUpdate(filteredExpense));
  };

  const handleEdit = (id:string) => {
    getID(id);
    changeStatus(true);
    console.log(changeStatus);
  };

  const expensesTableRow = expenses.map((expense) => {
    const convertedValue = (Number(expense.value)
      * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2);
    return (
      <tr key={ expense.id } className="table-row">
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{Number(expense.value).toFixed(2)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
        <td>{convertedValue}</td>
        <td>Real</td>
        <td>
          <button
            id="btn-edit"
            data-testid="edit-btn"
            onClick={ () => handleEdit(expense.id) }
          >
            Editar

          </button>
          <button
            id="btn-delete"
            data-testid="delete-btn"
            onClick={ () => handleClick(expense.id) }
          >
            Excluir

          </button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th className="description-header">Descrição</th>
          <th className="table-header">Tag</th>
          <th className="table-header">Método de pagamento</th>
          <th className="table-header">Valor</th>
          <th className="table-header">Moeda</th>
          <th className="table-header">Câmbio utilizado</th>
          <th className="table-header">Valor convertido</th>
          <th className="table-header">Moeda de conversão</th>
          <th className="table-header">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expensesTableRow}
      </tbody>
    </table>
  );
}

export default Table;
