import { describe, expect, test } from '@jest/globals';
import {
    NULL_STORAGE_SLOT,
    getAccountWithRevisionTestCases,
    getBytecodeTestCases,
    invalidGetAccountTests,
    invalidGetBytecodeTests,
    invalidGetStorageAtTests,
    testSmartContract,
    testStoragePositionKey,
    thorClient
} from './fixture';
import { testAccount } from '../../fixture';

/**
 * ThorClient class tests
 *
 * @group integration/client/thor
 */
describe('ThorClient', () => {
    /**
     * getAccount tests
     */
    describe('getAccount', () => {
        /**
         * getAccount tests with revision block number or block id
         */
        getAccountWithRevisionTestCases.forEach(
            ({ description, account, revision, expected }) => {
                test(description, async () => {
                    const accountDetails = await thorClient.getAccount(
                        account,
                        revision
                    );
                    expect(accountDetails).toEqual(expected);
                });
            }
        );

        /**
         * getAccount without revision (latest block)
         */
        test('get account without revision', async () => {
            const accountDetails = await thorClient.getAccount(testAccount);
            expect(accountDetails).toBeDefined();
            expect(accountDetails.balance).toBeDefined();
            expect(accountDetails.energy).toBeDefined();
            expect(accountDetails.hasCode).toBeDefined();
            expect(accountDetails.hasCode).toEqual(false);
        });

        /**
         * getAccount with invalid revision & address
         */
        invalidGetAccountTests.forEach(
            ({ description, address, revision, expectedError }) => {
                test(description, async () => {
                    await expect(
                        thorClient.getAccount(address, revision)
                    ).rejects.toThrowError(expectedError);
                });
            }
        );
    });

    /**
     * getBytecode tests
     */
    describe('getBytecode', () => {
        /**
         * Tests VTHO contract bytecode and revision
         */
        getBytecodeTestCases.forEach(
            ({ description, address, revision, expected }) => {
                test(description, async () => {
                    const bytecode = await thorClient.getBytecode(
                        address,
                        revision
                    );
                    expect(bytecode).toEqual(expected);
                });
            }
        );

        /**
         * Tests invalid revision & address
         */
        invalidGetBytecodeTests.forEach(
            ({ description, address, revision, expectedError }) => {
                test(description, async () => {
                    await expect(
                        thorClient.getBytecode(address, revision)
                    ).rejects.toThrowError(expectedError);
                });
            }
        );
    });

    /**
     * getStorageAt tests
     */
    describe('getStorageAt', () => {
        /**
         * Tests storage data at the specified position of the smart contract
         */
        test('Should get the storage data at the specified position of the smart contract', async () => {
            const storageData = await thorClient.getStorageAt(
                testSmartContract,
                testStoragePositionKey
            );

            expect(storageData).toBeDefined();
            expect(storageData).not.toEqual(NULL_STORAGE_SLOT);
        });

        /**
         * Tests storage data at the specified position of the smart contract with revision
         */
        test('Should get the storage data at the specified position of the smart contract with revision', async () => {
            const storageData = await thorClient.getStorageAt(
                testSmartContract,
                testStoragePositionKey,
                '1'
            );

            expect(storageData).toBeDefined();
            expect(storageData).toEqual(NULL_STORAGE_SLOT);
        });

        /**
         * Tests invalid position & revisions
         */
        invalidGetStorageAtTests.forEach(
            ({ description, address, position, revision, expectedError }) => {
                test(description, async () => {
                    await expect(
                        thorClient.getStorageAt(address, position, revision)
                    ).rejects.toThrowError(expectedError);
                });
            }
        );
    });
});
