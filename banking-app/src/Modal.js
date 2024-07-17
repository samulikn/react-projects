import { useState, useRef } from "react";
import Draggable from 'react-draggable';
import './App.css';
import { addTransaction } from './API';
import { getAccount } from './API';
import { useNavigate } from "react-router-dom";

export default function Modal({ user, isOpen, onCloseRequest, refreshData }){
    const [transactionDate, setTransactionDate] = useState("");
    const [object, setObject] = useState("");
    const [amount, setAmount] = useState("");
    const [transactionError, setTransactionError] = useState("");

    const nodeRef = useRef(null);
    const navigate = useNavigate();

    function clearEntries() {
        setTransactionDate("");
        setObject("");
        setAmount("");
    };
    
    async function record(form) {
        form.preventDefault();
        const formData = new FormData(form.target);
        const formJson = Object.fromEntries(formData.entries());
        const data = JSON.stringify(formJson);

        const result = await addTransaction(user, data);

        if (result.error) {
            setTransactionError(result.error);
        }
        else {
            const accountData = await getAccount(user);
            clearEntries();
            onCloseRequest();
            refreshData(accountData);
            navigate("/dashboard");
        };
    };

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            onCloseRequest();
        };
    });

    if (isOpen) {
        return (
            <>
                <div className="modal-wrapper"></div>
                <Draggable nodeRef={nodeRef} handle=".modalHeader">
                    <div className="modal" ref={nodeRef}>
                        <div className="modalHeader">
                            <h2>Transaction:</h2>
                        </div>
                        <form className="ModalForm" autoComplete="off" onSubmit={record} onReset={onCloseRequest}>
                            <label htmlFor="transactionDate">Date</label>
                            <input 
                                id="transactionDate" 
                                name="date" 
                                type="date"
                                value={transactionDate}
                                onChange={e => {
                                    if (transactionError) setTransactionError("");
                                    setTransactionDate(e.target.value)}}/>
                            <label htmlFor="transactionObject">Object</label>
                            <input 
                                id="transactionObject" 
                                name="object" 
                                type="text" 
                                maxLength={50}
                                value={object}
                                onChange={e => {
                                    if (transactionError) setTransactionError("");
                                    setObject(e.target.value);
                                }}/>
                            <label htmlFor="transactionAmount">Amount <span>(Use negative value for debit)</span></label> 
                            <input 
                                id="transactionAmount" 
                                name="amount" 
                                type="number"
                                value={amount}
                                onChange={e => {
                                    if(transactionError) setTransactionError("");
                                    setAmount(e.target.value);
                                }}/>
                            <div className="errorMessage">{ transactionError }</div>
                            <div className="button">
                                <button type="reset">Cancel</button>
                                <button type="submit">Record</button>
                            </div>
                        </form>
                    </div>
                </Draggable>
            </>
        )}
    else return null;
    
}