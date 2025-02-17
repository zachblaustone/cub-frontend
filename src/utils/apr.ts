import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, PCSCAKE_PER_YEAR, BAKE_PER_YEAR, BELT_PER_YEAR } from 'config'

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
export const getFarmApr = (
  poolWeight: BigNumber,
  cakePriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  isKingdom?: boolean,
  farmType?: string
): number => {
  // console.log('poolWeight',poolWeight.toNumber())
  // console.log('cakePriceUsd',cakePriceUsd.toNumber())
  // console.log('poolLiquidityUsd',poolLiquidityUsd.toNumber())
  // if (farmType === 'Belt') {
  //   console.log('poolWeight',poolWeight.toNumber())
  //   console.log('cakePriceUsd',cakePriceUsd.toNumber())
  //   console.log('poolLiquidityUsd',poolLiquidityUsd.toNumber())
  // }

  if (isKingdom) {
    let yearlyCakeRewardAllocation = PCSCAKE_PER_YEAR.times(poolWeight)
    if (farmType === 'Bakery') yearlyCakeRewardAllocation = BAKE_PER_YEAR.times(poolWeight)
    else if (farmType === 'Belt') yearlyCakeRewardAllocation = BELT_PER_YEAR.times(poolWeight)

    const apr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
    return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
  }
  const yearlyCakeRewardAllocation = CAKE_PER_BLOCK.times(BLOCKS_PER_YEAR).times(poolWeight)
  const liquidity = poolLiquidityUsd.toNumber() ? poolLiquidityUsd : new BigNumber(0)
  const apr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(liquidity).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

export default null
