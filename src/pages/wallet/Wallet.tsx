import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header';
import Table from '../../components/table';
import WalletForm from '../../components/walletForm';
import { ReduxStateType } from '../../types';

function Wallet() {
  const [editStatus, setEditStatus] = useState(false);
  const [id, setId] = useState('');
  const { expenses } = useSelector((state:ReduxStateType) => state.wallet);
  useEffect(() => {
    console.log(id);
    console.log(editStatus);
  }, [id, editStatus]);

  return (
    <Header>
      <WalletForm
        status={ editStatus }
        recoveredId={ id }
        changeStatus={ setEditStatus }
      />
      {(expenses.length !== 0)
      && <Table changeStatus={ setEditStatus } getID={ setId } />}
    </Header>
  );
}

export default Wallet;
