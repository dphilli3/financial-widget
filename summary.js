import React, { useState, useEffect } from 'react';
import './summary.css';

const SummaryWidget = ({ transactions, invoices }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [positiveThreshold, setPositiveThreshold] = useState(1000); // Configure your threshold here
  const [invoicesLast30Days, setInvoicesLast30Days] = useState(0);

  
  useEffect(() => {
    // Calculate the total monetary amount from transactions
    const calculatedTotal = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    // Calculate the number of invoices created in the last 30 days
    const currentDate = new Date();
    const last30Days = new Date(currentDate);
    last30Days.setDate(currentDate.getDate() - 30);
    const filteredInvoices = invoices.filter(
      (invoice) => new Date(invoice.creationDate) >= last30Days
    );

    setTotalAmount(calculatedTotal);
    setInvoicesLast30Days(filteredInvoices.length);
  }, [transactions, invoices]);

  const getStatusColor = () => {
    if (totalAmount > positiveThreshold) {
      return 'green';
    } else if (totalAmount > 0) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  return (
    <div className="summary-widget">
      <h2>Summary</h2>
      <p>Total Amount: <span style={{ color: getStatusColor() }}>{totalAmount}</span></p>
      <p>Invoices in Last 30 Days: {invoicesLast30Days}</p>
    </div>
  );
};

export default SummaryWidget;
