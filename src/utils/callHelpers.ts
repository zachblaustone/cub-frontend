import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
import { ethers } from 'ethers'
import { BIG_TEN, BIG_ZERO } from './bigNumber'

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account) => {
  /* if (pid === 0) {
    return masterChefContract.methods
      .enterStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } */

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, decimals = 18, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, gas: 200000, value: new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  /* if (pid === 0) {
    return masterChefContract.methods
      .leaveStaking(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  } */

  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousUnstake = async (sousChefContract, amount, decimals = 18, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0x453a75908fb5a36d482d5f8fe88eca836f32ead5') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }

  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmergencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account, isKingdom) => {
  // if (pid === 0) {
  //   return masterChefContract.methods
  //     .leaveStaking('0')
  //     .send({ from: account })
  //     .on('transactionHash', (tx) => {
  //       return tx.transactionHash
  //     })
  // }
  if (isKingdom) {
    return masterChefContract.methods
      .withdraw(pid, '0')
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: BIG_ZERO })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
