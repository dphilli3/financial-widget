import React, { useState  } from 'react';
import SummaryWidget from './summary';
import InvoicesWidget from './invoices';
import { editableInputTypes } from '@testing-library/user-event/dist/utils';

const Dashboard = () => {

  const mockTransactions = [ 
  {
    id: 1,
    transactionDate: '2023-09-01',
    description: 'Salary',
    referenceNumber: 'TXN001',
    amount: 5000,
  },
  {
    id: 2,
    transactionDate: '2023-09-02',
    description: 'Rent',
    referenceNumber: 'TXN002',
    amount: -1000,
  },
  {
    id: 2,
    transactionDate: '2023-09-13',
    description: 'Rent',
    referenceNumber: 'INV002',
    amount: -500,
  }
  // Add more transactions
];

  const mockInvoices = [
    {
      id: 1,
      client: 'Client A',
      creationDate: '2023-08-05',
      referenceNumber: 'INV001',
      amount: 1500,
    },
    {
      id: 2,
      client: 'Client B',
      creationDate: '2023-09-10',
      referenceNumber: 'INV002',
      amount: -500,
    }

  ]
  const [transactions, setTransactions] = useState(mockTransactions); // Initialize with your transaction data
  const [invoices, setInvoices] = useState(mockInvoices); // Initialize with your invoice data

  const addInvoice = (newInvoice) => {
    // Logic to add a new invoice to the state
    setInvoices([...invoices, newInvoice]);
  };

  
  return (
    <div className="dashboard">
      <SummaryWidget transactions={transactions} invoices={invoices} />
      <InvoicesWidget
        invoices={invoices}
        transactions={transactions}
        addInvoice={addInvoice}
      />
    </div>
  );
}

export default Dashboard;
