import { beforeEach, describe, expect, test } from '@jest/globals';
import { NotImplementedError } from '@vechain/sdk-errors';
import { RPC_METHODS, RPCMethodsMap, ThorClient } from '../../../../../src';
import { testnetUrl } from '../../../fixture';

/**
 * RPC Mapper integration tests for 'eth_getTransactionByBlockHashAndIndex' method
 *
 * @group integration/rpc-mapper/methods/eth_getTransactionByBlockHashAndIndex
 */
describe('RPC Mapper - eth_getTransactionByBlockHashAndIndex method tests', () => {
    /**
     * Thor client instance
     */
    let thorClient: ThorClient;

    /**
     * Init thor client before each test
     */
    beforeEach(() => {
        // Init thor client
        thorClient = ThorClient.fromUrl(testnetUrl);
    });

    /**
     * eth_getTransactionByBlockHashAndIndex RPC call tests - Positive cases
     */
    describe('eth_getTransactionByBlockHashAndIndex - Positive cases', () => {
        /**
         * Positive case 1 - ... Description ...
         */
        test('eth_getTransactionByBlockHashAndIndex - positive case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.eth_getTransactionByBlockHashAndIndex
                    ]([-1])
            ).rejects.toThrowError(NotImplementedError);
        });
    });

    /**
     * eth_getTransactionByBlockHashAndIndex RPC call tests - Negative cases
     */
    describe('eth_getTransactionByBlockHashAndIndex - Negative cases', () => {
        /**
         * Negative case 1 - ... Description ...
         */
        test('eth_getTransactionByBlockHashAndIndex - negative case 1', async () => {
            // NOT IMPLEMENTED YET!
            await expect(
                async () =>
                    await RPCMethodsMap(thorClient)[
                        RPC_METHODS.eth_getTransactionByBlockHashAndIndex
                    ](['SOME_RANDOM_PARAM'])
            ).rejects.toThrowError(NotImplementedError);
        });
    });
});
