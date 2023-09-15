import React, { useState } from 'react';
import './invoices.css';

const InvoicesWidget = ({ invoices, transactions, addInvoice }) => {
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    creationDate: '',
    referenceNumber: '',
    amount: 0,
  });

  const [formErrors, setFormErrors] = useState({
    client: '',
    creationDate: '',
    referenceNumber: '',
    amount: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleAddInvoice = () => {
    if (validateEntry()) {
    // Add the new invoice to the list
    addInvoice(newInvoice);
    setNewInvoice({
      client: '',
      creationDate: '',
      referenceNumber: '',
      amount: 0,
    });

    setFormErrors({
        client: '',
        creationDate: '',
        referenceNumber: '',
        amount: '',
        });
    }
};



  const getStatus = (invoice) => {
    // Determine if the invoice is PAID or NOT PAID based on transactions
    const matchingTransaction = transactions.find(
      (transaction) =>
        transaction.amount === invoice.amount &&
        transaction.referenceNumber === invoice.referenceNumber &&
        new Date(transaction.transactionDate) > new Date(invoice.creationDate)
    );

    return matchingTransaction ? 'PAID' : 'NOT PAID';
  };

  const validateEntry = () => {
    let valid = true;
    const errors = {
        client: '',
        creationDate: '',
        referenceNumber: '',
        amount: '',
    };

    if (!newInvoice.client) {
        errors.client = 'Client name is required';
        valid = false;
    }
    if (!newInvoice.creationDate) {
        errors.creationDate = 'Creation Date name is required';
        valid = false;
    }
    if (!newInvoice.referenceNumber) {
        errors.referenceNumber = 'Reference # is required';
        valid = false;
    }
    if (!newInvoice.amount) {
        errors.amount = 'Amount name is required';
        valid = false;
    }

    setFormErrors(errors);
    return valid;

  };


  return (
    <div className="invoices-widget">
        <div style={
            {display: 'flex',  
            justifyContent:'center', 
            alignItems:'center', 
            height: '200px'}
            }>
      <h2>Invoices</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Creation Date</th>
            <th>Reference Number</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td>{invoice.client}</td>
              <td>{invoice.creationDate}</td>
              <td>{invoice.referenceNumber}</td>
              <td>{invoice.amount}</td>
              <td>{getStatus(invoice)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Invoice</h3>
      <div className="invoice-form">
        <input
          type="text"
          name="client"
          placeholder="Client"
          value={newInvoice.client}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="creationDate"
          value={newInvoice.creationDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="referenceNumber"
          placeholder="Reference Number"
          value={newInvoice.referenceNumber}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newInvoice.amount}
          onChange={handleChange}
        />
        <button onClick={handleAddInvoice}>Add Invoice</button>
      </div>
    </div>
  );
};



export default InvoicesWidget;
