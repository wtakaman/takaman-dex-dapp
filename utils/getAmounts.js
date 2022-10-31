import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS
} from "../constants";
import {Contract} from "ethers";

export const getEtherBalance = async (provider, address, contract = false) => {
    try {
        if (contract) {
            const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS);
            return balance;
        } else {
            const balance = await provider.getBalance(address);
            return balance;
        }
    } catch (e) {
        console.error(e);
        return 0;
    }
}

export const getTKTokensBalance = async (provider, address) => {
    try {
        const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, provider);
        const balanceOfTakamanDevTokens = await tokenContract.balanceOf(address);
        return balanceOfTakamanDevTokens;
    } catch (e) {
        console.error(e);
    }
}

export const getLPTokensBalance = async (provider, address) => {
    try {
        const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
        const balanceOfLPTokens = await exchangeContract.balanceOf(address);
        return balanceOfLPTokens;
    } catch (e) {
        console.error(e);
    }
}

export const getReserveOfTKTokens = async (provider) => {
    try {
        const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
        const reserve = await exchangeContract.getReserve();
        return reserve;
    } catch (e) {
        console.error(e);
    }
}
