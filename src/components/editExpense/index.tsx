import { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, ExpenseList, ReduxStateType } from '../../types';
import { walletUpdate } from '../../redux/actions';
import './index.css';

type EditType = {
  id:string,
  status: Dispatch<SetStateAction<boolean>>
};

function EditExpense({ status, id }:EditType) {
  const INITIAL_FORM = {
    id: '0',
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  const { currencies, expenses } = useSelector((state:ReduxStateType) => state.wallet);

  const findExpense = expenses.find((expense) => expense.id === id);

  const [newExpenseData, setNewExpenseData] = useState<ExpenseList | any>(findExpense);

  const dispatch:DispatchType = useDispatch();

  function handleChange(event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setNewExpenseData({
      ...newExpenseData,
      [name]: value,
    });
  }

  return (
    <div id="form-container">
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          const newExpenseList = expenses
            .map((expense) => (expense.id === findExpense?.id
              ? newExpenseData : expense));
          console.log(newExpenseList);
          dispatch(walletUpdate(newExpenseList));
          // setNewExpenseData(INITIAL_FORM);
          status(false);
        } }
      >
        <label htmlFor="description" id="description-label">Descrição da despesa</label>
        <input
          type="text"
          name="description"
          id="description"
          className="inputs"
          data-testid="description-input"
          value={ newExpenseData.description }
          onChange={ (event) => handleChange(event) }
        />
        <label htmlFor="tag-input" id="tag-label">Categoria da despesa</label>
        <select
          name="tag"
          className="inputs"
          id="tag-input"
          data-testid="tag-input"
          onChange={ (event) => handleChange(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>

        </select>
        <label htmlFor="tag-input" id="value-label">Valor</label>
        <input
          type="number"
          className="inputs"
          name="value"
          id="value"
          data-testid="value-input"
          value={ newExpenseData.value }
          onChange={ (event) => handleChange(event) }
        />
        <select
          name="method"
          className="inputs"
          id="method-input"
          data-testid="method-input"
          onChange={ (event) => handleChange(event) }
        >
          <option value="disabled">Método de pagamento</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="currency-input">Moeda</label>
        <select
          name="currency"
          value={ newExpenseData.currency }
          id="currency-input"
          className="inputs"
          data-testid="currency-input"
          onChange={ (event) => handleChange(event) }
        >
          {currencies.map((coin, index) => (
            <option key={ index } value={ coin }>{coin}</option>
          ))}
        </select>
        {/* <label htmlFor="method-input">Selecione a forma de pagamento</label> */}

        <button
          type="submit"
          id="form-submit-btn"
        >
          Editar despesa
        </button>
      </form>
    </div>
  );
}

export default EditExpense;
