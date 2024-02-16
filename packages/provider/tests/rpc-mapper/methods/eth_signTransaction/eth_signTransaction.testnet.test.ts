import { beforeEach, describe, expect, test } from '@jest/globals';
import { NotImplementedError } from '@vechain/vechain-sdk-errors';
import { RPC_METHODS, RPCMethodsMap } from '../../../../src';
import { ThorClient } from '@vechain/vechain-sdk-network';
import { testNetwork } from '../../../fixture';

/**
 * RPC Mapper integration tests for 'eth_signTransaction' method
 *
 * @group integration/rpc-mapper/methods/eth_signTransaction
 */
describe('RPC Mapper - eth_signTransaction method tests', () => {
    /**
     * Thor client instance
     */
    let thorClient: ThorClient;

    /**
     * Init thor client before each test
     */
    beforeEach(() => {
        // Init thor client
        thorClient = new ThorClient(testNetwork);
    });

    /**
     * eth_signTransaction RPC call tests - Positive cases
     */
    describe('eth_signTransaction - Positive cases', () => {
        /**
         * Positive case 1 - ... Description ...
         */
        test('eth_signTransaction - positive case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.eth_signTransaction
                    ]([-1])
            ).rejects.toThrowError(NotImplementedError);
        });
    });

    /**
     * eth_signTransaction RPC call tests - Negative cases
     */
    describe('eth_signTransaction - Negative cases', () => {
        /**
         * Negative case 1 - ... Description ...
         */
        test('eth_signTransaction - negative case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.eth_signTransaction
                    ](['SOME_RANDOM_PARAM'])
            ).rejects.toThrowError(NotImplementedError);
        });
    });
});