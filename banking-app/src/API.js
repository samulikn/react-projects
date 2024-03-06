const API_ROOT = "//localhost:5000/api";

async function sendRequest(api, method, body) {
    try {
        const response = await fetch(API_ROOT + api, {
            method: method || 'GET',
            headers: body ? { 'Content-Type': 'application/json' } : undefined,
            body: body
        });
        return await response.json();
    } catch (error) {
        return { error: error.message || 'Unknown error' };
    }
};

export async function getAccount(user) {
    return sendRequest('/accounts/' + encodeURIComponent(user));
};

export async function createAccount(account) {
    return sendRequest('/accounts', 'POST', account);
};

export async function addTransaction(user, transactionData) {
    return sendRequest('/accounts/' + encodeURIComponent(user) + '/transactions', 'POST', transactionData);
};