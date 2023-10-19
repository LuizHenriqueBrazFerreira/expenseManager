import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, ReduxStateType } from '../../types';
import { fetchWallet } from '../../fetch';
import { walletCurrencys, walletExpense } from '../../redux/actions';
import EditExpense from '../editExpense';
import './index.css';

let id = 0;

type FormStatusType = { status: boolean, recoveredId:string,
  changeStatus: Dispatch<SetStateAction<boolean>> };

function WalletForm({ status, recoveredId, changeStatus }:FormStatusType) {
  const INITIAL_FORM = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  const dispatch:DispatchType = useDispatch();

  const [expenseData, setExpenseData] = useState(INITIAL_FORM);
  const { currencies } = useSelector((state:ReduxStateType) => state.wallet);

  useEffect(() => {
    async function newFetch() {
      const recoveredFetch = await fetchWallet();
      if ('USDT' in recoveredFetch) {
        delete recoveredFetch.USDT;
      }
      // console.log(recoveredFetch);
      dispatch(walletCurrencys(recoveredFetch));
    }
    newFetch();
  }, []);

  function handleChange(event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rates = await fetchWallet();
    const saveExpenseData = {
      ...expenseData,
      id: id++,
      exchangeRates: rates,
    };
    dispatch(walletExpense(saveExpenseData));
    setExpenseData(INITIAL_FORM);
  }

  if (status) return <EditExpense id={ recoveredId } status={ changeStatus } />;

  return (
    <div id="form-container">
      <form action="" onSubmit={ (event) => handleSubmit(event) }>
        <label htmlFor="description" id="description-label">Descrição da despesa</label>
        <input
          type="text"
          className="inputs"
          name="description"
          id="description"
          data-testid="description-input"
          value={ expenseData.description }
          onChange={ (event) => handleChange(event) }
        />
        <label htmlFor="tag-input" id="tag-label">Categoria da despesa</label>
        <select
          name="tag"
          id="tag-input"
          className="inputs"
          data-testid="tag-input"
          onChange={ (event) => handleChange(event) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>

        </select>
        <label htmlFor="value" id="value-label">Valor:</label>
        <input
          type="number"
          id="value"
          name="value"
          className="inputs"
          data-testid="value-input"
          value={ expenseData.value }
          onChange={ (event) => handleChange(event) }
        />
        <label
          htmlFor="method-input"
          id="method-label"
        >
          Método de pagamento

        </label>
        <select
          name="method"
          id="method-input"
          className="inputs"
          data-testid="method-input"
          onChange={ (event) => handleChange(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <label htmlFor="currency-input" id="currency-label">Moeda</label>
        <select
          name="currency"
          className="inputs"
          value={ expenseData.currency }
          id="currency-input"
          data-testid="currency-input"
          onChange={ (event) => handleChange(event) }
        >
          {currencies.map((coin, index) => (
            <option key={ index } value={ coin }>{coin}</option>
          ))}
        </select>
        <button id="form-submit-btn">
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
