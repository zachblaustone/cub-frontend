// import contracts from './contracts'
import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 10,
    lpSymbol: 'CUB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84',
    },
    token: tokens.cub,
    quoteToken: tokens.busd,
  },
  {
    pid: 11,
    lpSymbol: 'CUB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xc08C74dC9EF46C6dB122b30c48a659831017DD2E',
    },
    token: tokens.cub,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 9,
    lpSymbol: 'bLEO-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x243E060DEcA0499fCaE6ABe548C0115faaBa0ed4',
    },
    token: tokens.bleo,
    quoteToken: tokens.wbnb,
  },
  // {
  //   pid: 0,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1B96B92314C44b159149f7E0303511fB2Fc4774f',
  //   },
  //   token: tokens.wbnb,
  //   quoteToken: tokens.busd,
  // },
  {
    pid: 6,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xc15fa3E22c912A276550F3E5FE3b0Deb87B55aCd',
    },
    token: tokens.usdt,
    quoteToken: tokens.busd,
  },
  {
    pid: 8,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x7561EEe90e24F3b348E1087A005F78B4c8453524',
    },
    token: tokens.btcb,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 7,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      97: '',
      56: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    token: tokens.eth,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x3aB77e40340AB084c3e23Be8e5A6f7afed9D41DC',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 23,
    lpSymbol: 'DEC-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x4c79edab89848f34084283bb1fe8eac2dca649c3',
    },
    token: tokens.dec,
    quoteToken: tokens.busd,
  },
  // {
  //   pid: 4,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x680Dd100E4b394Bda26A59dD5c119A391e747d18',
  //   },
  //   token: tokens.usdc,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 5,
  //   lpSymbol: 'DOT-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c',
  //   },
  //   token: tokens.dot,
  //   quoteToken: tokens.wbnb,
  // },
  // {
  //   pid: 2,
  //   lpSymbol: 'CAKE-BUSD LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0Ed8E0A2D99643e1e65CCA22Ed4424090B8B7458',
  //   },
  //   token: tokens.cake,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 1,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
  //   },
  //   token: tokens.cake,
  //   quoteToken: tokens.wbnb,
  // },

  {
    pid: 12,
    isTokenOnly: true,
    lpSymbol: 'CUB',
    lpAddresses: {
      97: '',
      56: '0x0EF564D4F8D6C0ffE13348A32e21EFd55e508e84', // CUB-BUSD LP
    },
    token: tokens.cub,
    quoteToken: tokens.busd,
  },

  // {
  //   pid: 13,
  //   isTokenOnly: true,
  //   lpSymbol: 'bLEO',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x243E060DEcA0499fCaE6ABe548C0115faaBa0ed4', // bLEO-WBNB LP
  //   },
  //   tokenSymbol: 'bLEO',
  //   tokenAddresses: {
  //     97: '',
  //     56: '0x6421531AF54C7B14Ea805719035EBf1e3661c44A',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },

  // {
  //   pid: 14,
  //   isTokenOnly: true,
  //   lpSymbol: 'BUSD',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
  //   },
  //   token: tokens.busd,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 15,
  //   isTokenOnly: true,
  //   lpSymbol: 'WBNB',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
  //   },
  //   token: tokens.wbnb,
  //   quoteToken: tokens.wbnb,
  // },
  // {
  //   pid: 16,
  //   isTokenOnly: true,
  //   lpSymbol: 'USDT',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd', // USDT-BUSD LP
  //   },
  //   token: tokens.usdt,
  //   quoteToken: tokens.busd,
  // },
  {
    pid: 17,
    isTokenOnly: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    token: tokens.btcb,
    quoteToken: tokens.busd,
  },
  {
    pid: 18,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
    },
    token: tokens.eth,
    quoteToken: tokens.busd,
  },
  // {
  //   pid: 19,
  //   isTokenOnly: true,
  //   lpSymbol: 'DAI',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc', // DAI-BUSD LP
  //   },
  //   token: tokens.dai,
  //   quoteToken: tokens.busd,
  // },
  // {
  //   pid: 20,
  //   isTokenOnly: true,
  //   lpSymbol: 'USDC',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x680dd100e4b394bda26a59dd5c119a391e747d18', // USDC-BUSD LP
  //   },
  //   token: tokens.usdc,
  //   quoteToken: tokens.busd,
  // },
  {
    pid: 21,
    isTokenOnly: true,
    lpSymbol: 'DOT',
    lpAddresses: {
      97: '',
      56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
    },
    token: tokens.dot,
    quoteToken: tokens.busd,
  },
  // {
  //   pid: 22,
  //   isTokenOnly: true,
  //   lpSymbol: 'CAKE',
  //   lpAddresses: {
  //     97: '',
  //     56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
  //   },
  //   token: tokens.cake,
  //   quoteToken: tokens.busd,
  // },

  // KINGDOMS
  /* {
    pid: 17,
    isKingdom: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      97: '',
      56: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      97: '',
      56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 18,
    isKingdom: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      97: '',
      56: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      97: '',
      56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 21,
    isKingdom: true,
    lpSymbol: 'DOT',
    lpAddresses: {
      97: '',
      56: '0x54c1ec2f543966953f2f7564692606ea7d5a184e', // DOT-BUSD LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      97: '',
      56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  }, */
  {
    pid: 0,
    isKingdom: true,
    isKingdomToken: true,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458', // CAKE-BUSD LP
    },
    token: tokens.cake,
    quoteToken: tokens.busd,
  },
  /* {
    pid: 15,
    isKingdom: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      97: '',
      56: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      97: '',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }, */
  {
    pid: 1,
    isKingdom: true,
    lpSymbol: 'WBNB-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x58f876857a02d6762e0101bb5c46a8c1ed44dc16',
    },
    token: tokens.wbnb,
    quoteToken: tokens.busd,
  },
]

export default farms
