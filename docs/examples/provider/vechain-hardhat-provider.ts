import { HardhatVechainProvider } from '@vechain/sdk-provider';
import { BaseWallet } from '@vechain/sdk-wallet';
import { expect } from 'expect';

const testnetUrl = 'https://testnet.vechain.org';

// 1 - Init provider
const provider = new HardhatVechainProvider(
    new BaseWallet([]),
    testnetUrl,
    (message: string, parent?: Error) => new Error(message, parent)
);

// 2 - Call RPC function
const rpcCallChainId = await provider.request({
    method: 'eth_chainId'
});

expect(rpcCallChainId).toBe('0x186aa');