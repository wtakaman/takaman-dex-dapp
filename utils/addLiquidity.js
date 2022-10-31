import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS
} from "../constants";
import {Contract, utils} from "ethers";

export const addLiquidity = async (signer, addTKAmountWei, addEtherAmountWei) => {
    try {
      const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_CONTRACT_ABI, signer);
      const exchangeContract = new Contract(EXCHANGE_CONTRACT_ADDRESS, EXCHANGE_CONTRACT_ABI, signer);
      let tx = await tokenContract.approve(EXCHANGE_CONTRACT_ADDRESS, addTKAmountWei.toString());
      await tx.wait();

      tx = await exchangeContract.addLiquidity(addTKAmountWei, {
          value: addEtherAmountWei,
      });
      await tx.wait();
    } catch (e) {
        console.error(e);
    }
}


export const calculateTK = async (_addEther = "0", etherBalanceContract, tkTokenReserve) => {
    const _addEtherAmountWei = utils.parseEther(_addEther);
    const takamanDevTokenAmount = _addEtherAmountWei.mul(tkTokenReserve).div(etherBalanceContract);
    return takamanDevTokenAmount;
}

