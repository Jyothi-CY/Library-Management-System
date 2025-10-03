import { useState, useEffect } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function AdminDashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [transactions])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Transactions</h1>
      <Table fullWidth aria-label="transactions">
        <TableHeader aria-label="columns" className="h-[50px]">
          <TableColumn>Book ID</TableColumn>
          <TableColumn>Borrower ID</TableColumn>
          <TableColumn>From Date</TableColumn>
          <TableColumn>To Date</TableColumn>
          <TableColumn>Return Date</TableColumn>
          <TableColumn>Transaction Status</TableColumn>
        </TableHeader>
        <TableBody>
          {transactions &&
            transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.bookId}</TableCell>
                <TableCell>{transaction.borrowerId}</TableCell>
                <TableCell>{transaction.fromDate}</TableCell>
                <TableCell>{transaction.toDate}</TableCell>
                <TableCell>{transaction.returnDate}</TableCell>
                <TableCell>{transaction.transactionStatus}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
