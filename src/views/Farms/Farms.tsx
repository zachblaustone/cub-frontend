import React, { useEffect, useCallback, useState, useMemo, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useAppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, Button, Flex } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
// import { MigrationV2 } from 'components/Banner'
import { useFarms, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import usePersistState from 'hooks/usePersistState'
import { Farm } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApr } from 'utils/apr'
import { orderBy } from 'lodash'
import { getAddress } from 'utils/addressHelpers'
import isArchivedPid from 'utils/farmHelpers'
import PageHeader from 'components/PageHeader'
import { fetchFarmsPublicDataAsync, setLoadArchivedFarmsData } from 'state/farms'
import Select, { OptionProps } from 'components/Select/Select'
import { DEFAULT_TOKEN_DECIMAL } from 'config'
// import { useGetStats } from 'hooks/api'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
// import CardValue from '../Home/components/CardValue'


const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;
  margin-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
    margin-bottom: 0;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`

const FeeWrapper = styled.div`
  max-width: 400px;
`

/* const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
` */

const NUMBER_OF_FARMS_VISIBLE = 12

export interface FarmsProps{
  tokenMode?: boolean
  kingdomMode?: boolean
}

const Farms: React.FC<FarmsProps> = ({ tokenMode, kingdomMode }) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, 'pancake_farm_view')
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()

  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived

  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)

  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])

  useEffect(() => {
    // Makes the main scheduled fetching to request archived farms data
    dispatch(setLoadArchivedFarmsData(isArchived))

    // Immediately request data for archived farms so users don't have to wait
    // 60 seconds for public data and 10 seconds for user data
    if (isArchived) {
      dispatch(fetchFarmsPublicDataAsync())
      if (account) {
        dispatch(fetchFarmUserDataAsync(account))
      }
    }
  }, [isArchived, dispatch, account])

  // const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const activeFarms = farmsLP.filter(farm => {
    if (kingdomMode) {
      return !!farm.isKingdom === !!kingdomMode && farm.multiplier !== '0X' && !isArchivedPid(farm.pid)
    }
    return !!farm.isTokenOnly === !!tokenMode && !!farm.isKingdom === !!kingdomMode && farm.multiplier !== '0X' && !isArchivedPid(farm.pid)
  })
  // const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X' && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter(farm => {
    if (kingdomMode) {
      return !!farm.isKingdom === !!kingdomMode && farm.multiplier === '0X' && !isArchivedPid(farm.pid)
    }
    return !!farm.isTokenOnly === !!tokenMode && !!farm.isKingdom === !!kingdomMode && farm.multiplier === '0X' && !isArchivedPid(farm.pid)
  })
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address).toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apr = isActive ? getFarmApr(farm.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return farm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, prices, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')
        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )
        case 'earned':
          return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (!kingdomMode && viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} userDataReady={userDataReady} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
          <Route exact path={`${path}/archived`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  let header = TranslateString(674, 'Farms')
  let heading = TranslateString(320, 'Stake LP tokens to earn CUB')
  let subHeading = TranslateString(10000, 'Deposit Fee will be used to buyback CUB and bLEO')
  let subHeadingPCS = null
  let subHeadingCertik = null
  let kingdomFees = null
  // let extra = null
  // const data = useGetStats()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  if (tokenMode) {
    header = TranslateString(674, 'Dens')
    heading = TranslateString(10002, 'Stake tokens to earn CUB')
  } else if (kingdomMode) {
    header = TranslateString(674, 'Kingdoms')
    heading = TranslateString(null, 'Kingdoms: Composable Auto-Compounding')
    subHeading = TranslateString(null, 'Stake tokens for cross-platform farming plus CUB rewards')
    subHeadingPCS = (
      <Heading as="h2" color="warning" mb="20px" style={{ textAlign: 'left' }}>
        IMPORTANT: Must use <a target="_blank" rel="noreferrer" href="https://exchange.pancakeswap.finance/#/pool">Pancakeswap V2 Exchange</a> for V2 Kingdom LP tokens until we add a V2 exchange for Cub Finance
      </Heading>
    )
    subHeadingCertik = (
      <Heading as="h2" color="warning" mb="20px" style={{ textAlign: 'left' }}>
        CertiK Audit is Pending: Our other contracts have been audited by CertiK and Kingdoms are currently under review. Please use at your own discretion until the audit has been published
      </Heading>
    )
    kingdomFees = (
      <FeeWrapper>
      <Heading as="h2" color="secondary" mb="5px" style={{ textAlign: 'left' }}>
        Fees
      </Heading>
        <Flex justifyContent="space-between">
          <Text>Management Fee:</Text>
          <Text>0.9%</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Withdrawal Fee:</Text>
          <Text>None</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>Fee to CUB Staking Kingdom:</Text>
          <Text>1%</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text>CUB Burn Rate:</Text>
          <Text>100% of Fees Buyback and Burn CUB</Text>
        </Flex>
      </FeeWrapper>
    )
  }

  const tlvSpacing = '20px'

  return (
    <>
      <PageHeader>
        <Heading as="h1" size="xxl" color="secondary" mb="15px">
          {header}
        </Heading>
        <Heading as="h1" size="lg" color="primary" mb="20px" style={{ textAlign: 'left' }}>
          {heading}
        </Heading>
        <Heading as="h2" color="secondary" mb={tlvSpacing} style={{ textAlign: 'left' }}>
          {subHeading}
        </Heading>
        {subHeadingPCS}
        {subHeadingCertik}
        {kingdomFees}
        <br/>
        {/* extra */}
        <Wrapper>
          <Button size="sm">
            <a href="https://docs.cubdefi.com">Learn More</a>
          </Button>
        </Wrapper>
      </PageHeader>
      {/* <MigrationV2 /> */}
      <Page>
        <ControlContainer>
          {
            !kingdomMode && (
              <ViewControls>
                <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
                <ToggleWrapper>
                  <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
                  <Text> {TranslateString(1116, 'Staked only')}</Text>
                </ToggleWrapper>
                <FarmTabButtons
                  hasStakeInFinishedFarms={stakedInactiveFarms.length > 0}
                  hasStakeInArchivedFarms={stakedArchivedFarms.length > 0}
                />
              </ViewControls>
            )
          }
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <div ref={loadMoreRef} />
        <Image src="/images/cub/wide.svg" alt="illustration" width={1352} height={587} responsive />
      </Page>
    </>
  )
}

export default Farms
