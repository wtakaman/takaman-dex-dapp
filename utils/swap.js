import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS
} from "../constants";
import {Contract} from "ethers";

export const getAmountOfTokensReceivedFromSwap = async (_swaptAmountWei, provider, ethSelected, ethBalance, reservedTK) => {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
    let amountOfTokens;
    if (ethSelected) {
        amountOfTokens = await exchangeContract.getAmountOfTokens(_swaptAmountWei, ethBalance, reservedTK);
    }   else {
        amountOfTokens = await exchangeContract.getAmountOfTokens(_swaptAmountWei, reservedTK, ethBalance);
    }
    return amountOfTokens;
}

export const swapTokens = async (signer, _swapAmountWei, tokentoBeReceivedAfterSwap, ethSelected) => {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);
    const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer);
    let tx;
    if (ethSelected) {
        tx = await exchangeContract.ethToTakamanDevToken(tokentoBeReceivedAfterSwap, {
            value: _swapAmountWei
        });
    } else {
        tx = await tokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, _swapAmountWei.toString());
        await tx.wait();
        tx = await exchangeContract.takamanDevTokenToEth(_swapAmountWei, tokentoBeReceivedAfterSwap);
    }
    await tx.wait();
}
