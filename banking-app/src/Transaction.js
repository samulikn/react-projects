import './App.css';

export default function Transaction({ transaction }) {
    return(
        <tr key="transaction.id">
            <td>{ transaction.date }</td>
            <td>{ transaction.object }</td>
            <td>{ transaction.amount.toFixed(2) }</td>
        </tr>
    )
}