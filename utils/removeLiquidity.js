import {EXCHANGE_CONTRACT_ABI, EXCHANGE_CONTRACT_ADDRESS} from "../constants";
import {Contract} from "ethers";

export const removeLiquidity = async (signer, removeLPTokensWei) => {
    try {
      const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);
      let tx = await exchangeContract.removeLiquidity(removeLPTokensWei.toString());
      await tx.wait();
    } catch (e) {
        console.error(e);
    }
}

export const getTokensAfterRemove = async (provider, removeLPTokensWei, _ethBalance, tkTokenReserve) => {
    const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, provider);
    const totalSupply = await exchangeContract.totalSupply();
    const removeEther = _ethBalance.mul(removeLPTokensWei).div(totalSupply);
    const removeTK = tkTokenReserve.mul(removeLPTokensWei).div(totalSupply);
    return {removeTK, removeEther};
}

