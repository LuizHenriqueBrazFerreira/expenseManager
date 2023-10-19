import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import user from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Verifica a funcionalidade da aplicação', () => {
  test('Verifica se o componente `App` é renderizado corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  test('Verifica se a rota `/carteira` é renderizada corretamente', async () => {
    const responseApi = {
      ok: true,
      json: async () => mockData,
    } as Response;

    const dataApi = responseApi.json();
    const keysApi = Object.keys(dataApi);
    const valueExpense = '32';
    // const dogeAsk = '0.29304';

    vi.spyOn(global, 'fetch').mockResolvedValue(responseApi);

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByText('BRL')).toBeInTheDocument();

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const optionCurrency = screen.getByRole('combobox', { name: /selecione a moeda/i });
    const optionMethod = screen.getByRole('combobox', { name: /selecione a forma de pagamento/i });
    const optionTag = screen.getByRole('combobox', { name: /selecione a intenção da despesa/i });
    const submitBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    // const valueText = screen.getByTestId('total-field');

    expect(optionCurrency).toHaveDisplayValue(keysApi);
    expect(optionMethod).toHaveDisplayValue(/dinheiro/i);
    expect(optionTag).toHaveDisplayValue(/alimentação/i);

    await user.type(valueInput, valueExpense);
    await user.type(descriptionInput, 'dogao');
    await user.selectOptions(optionCurrency, 'DOGE');
    await user.selectOptions(optionMethod, 'Cartão de crédito');
    await user.selectOptions(optionTag, 'Lazer');

    expect(valueInput).toHaveDisplayValue(valueExpense);
    expect(descriptionInput).toHaveDisplayValue('dogao');
    expect(optionCurrency).toHaveDisplayValue(/doge/i);
    expect(optionMethod).toHaveDisplayValue(/cartão de crédito/i);
    expect(optionTag).toHaveDisplayValue(/lazer/i);

    await user.click(submitBtn);
  });

  test('Verifica se ao usuário `alguem@gmail.com` fizer login o seu email será devidamente exibido', async () => {
    const responseApi = {
      ok: true,
      json: async () => mockData,
    } as Response;

    const dataApi = responseApi.json();
    const keysApi = Object.keys(dataApi);

    const MOCK_EXPENSE = {
      id: '0',
      value: '32',
      description: 'dogão',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
      exchangeRates: { USD: { ask: '5' } },
    };

    const MOCK_STORE = {
      user: {
        email: 'alguem@gmail.com',
      },
      wallet: {
        currencies: keysApi,
        expenses: [MOCK_EXPENSE],
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState: MOCK_STORE });

    const userName = await screen.findByTestId('email-field');
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const optionCurrency = screen.getByRole('combobox', { name: /selecione a moeda/i });
    const optionMethod = screen.getByRole('combobox', { name: /selecione a forma de pagamento/i });
    const optionTag = screen.getByRole('combobox', { name: /selecione a intenção da despesa/i });
    const submitBtn = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(userName).toHaveTextContent('alguem@gmail.com');
    expect(screen.getByTestId('total-field')).toHaveTextContent('160');
    expect(valueInput).toHaveDisplayValue('');
    expect(descriptionInput).toHaveDisplayValue('');
    expect(optionCurrency).toHaveDisplayValue(keysApi);
    expect(optionMethod).toHaveDisplayValue('Dinheiro');
    expect(optionTag).toHaveDisplayValue('Alimentação');
    expect(submitBtn).toBeInTheDocument();
  });
});
