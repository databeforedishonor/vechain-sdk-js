import { ThorClient, VechainProvider } from '@vechain/sdk-network';
import { expect } from 'expect';

// START_SNIPPET: VechainProviderSnippet

// 1 - Create thor client for testnet
const testnetUrl = 'https://testnet.vechain.org';
const thorClient = ThorClient.fromUrl(testnetUrl);

// 2 - Init provider
const provider = new VechainProvider(thorClient);

// 3 - Call RPC function
const rpcCallChainId = await provider.request({
    method: 'eth_chainId'
});

// END_SNIPPET: VechainProviderSnippet

expect(rpcCallChainId).toBe('0x186aa');
