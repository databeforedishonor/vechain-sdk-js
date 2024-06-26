import * as utils from '@noble/curves/abstract/utils';
import { describe, expect, test } from '@jest/globals';
import { bloom, Hex } from '../../src';
import { bloomKTestCases } from './fixture';

/**
 * Bloom filter tests
 *
 * @NOTE different from ../utils/bloom/bloom.test.ts.
 * This tests bloom functionality, not the utils.
 * @group unit/bloom
 */
describe('Bloom Filter', () => {
    const textEncoder = new TextEncoder();

    /**
     * Test estimate K function
     */
    test('Estimate K', () => {
        bloomKTestCases.forEach((bloomKTestCase) => {
            expect(bloom.calculateK(bloomKTestCase.calculateK)).toBe(
                bloomKTestCase.estimatedK
            );
        });
    });

    /**
     * Test estimate bitsPerKey function
     */
    test('Estimate bits per key (m)', () => {
        bloomKTestCases.forEach((bloomKTestCase) => {
            expect(
                bloom.calculateBitsPerKey(
                    bloom.calculateK(bloomKTestCase.calculateK)
                )
            ).toBe(bloomKTestCase.bitsPerKey);
        });
    });

    /**
     * Bloom filter generator tests - Correct case
     */
    test('Should generate correct bloom filter', () => {
        const generator = new bloom.Generator();

        const keys = ['key1', 'key2', 'key3'];

        keys.forEach((key) => {
            generator.add(textEncoder.encode(key));
        });

        const bitsPerKey = 20;
        const k = bloom.calculateK(bitsPerKey);

        // Generate the bloom filter
        const filter = generator.generate(bitsPerKey, k);

        expect(Hex.of(filter.bits)).toBe('96b298d634155950');
        expect(filter.bits.byteLength).toBe(8); // 64 bits
        expect(filter.k).toBe(k);

        // Validate the generated filter with the expected behavior
        keys.forEach((key) => {
            expect(filter.contains(textEncoder.encode(key))).toBe(true);
        });

        // Validate false positives/negatives, similar to how it's done in the Go test
        // Assuming 'falseKey1' does not exist in the filter
        expect(filter.contains(textEncoder.encode('falseKey1'))).toBe(false);
    });

    /**
     * Bloom filter generator tests - No keys case
     */
    test('Should generate empty bloom filter when no keys are added', () => {
        const generator = new bloom.Generator();

        const bitsPerKey = 20;
        const k = bloom.calculateK(bitsPerKey);

        // Generate the bloom filter
        const filter = generator.generate(bitsPerKey, k);

        expect(filter.bits.byteLength).toBe(8);
        expect(filter.k).toBe(k);
        expect(Hex.of(filter.bits)).toBe('0000000000000000'); // 16 groups of 4 bits, all 0 -> 64 bits
    });

    /**
     * Bloom filter generator tests - Large number of keys case
     */
    test('Should generate bloom filter with byte length higher than 8 for large number of keys', () => {
        const generator = new bloom.Generator();

        const keys: string[] = [];

        for (let i = 0; i < 10; i++) {
            keys.push(`key${i}`);
        }

        keys.forEach((key) => {
            generator.add(textEncoder.encode(key));
        });

        const bitsPerKey = 20;
        const k = bloom.calculateK(bitsPerKey);

        // Generate the bloom filter
        const filter = generator.generate(bitsPerKey, k);

        expect(Hex.of(filter.bits)).toBe(
            'a4d641159d68d829345f86f40d50676cf042f6265072075a94'
        );
        expect(filter.bits.byteLength).toBe(25);
        expect(filter.k).toBe(k);

        expect(JSON.stringify(filter.bits)).toBe(
            JSON.stringify(
                utils.hexToBytes(
                    'a4d641159d68d829345f86f40d50676cf042f6265072075a94'
                )
            )
        );

        // Validate the generated filter with the expected behavior
        keys.forEach((key) => {
            expect(filter.contains(textEncoder.encode(key))).toBe(true);
        });
    });

    /**
     * Bloom filter generator tests - Non-ASCII and binary data case
     */
    test('Should correctly handle non-ASCII and binary data', () => {
        const generator = new bloom.Generator();

        // UTF-8 characters and binary data
        const keys = ['🚀', '🌕', '\x00\x01\x02'];

        keys.forEach((key) => {
            generator.add(textEncoder.encode(key));
        });

        const bitsPerKey = 10;
        const k = bloom.calculateK(bitsPerKey);

        expect(k).toBe(6);

        const filter = generator.generate(bitsPerKey, k);

        expect(Hex.of(filter.bits)).toBe('1190199325088200');

        // Validate the generated filter
        keys.forEach((key) => {
            expect(filter.contains(textEncoder.encode(key))).toBe(true);
        });
    });

    /**
     * Bloom filter generator tests - Empty string case
     */
    test('Should correctly handle empty string', () => {
        const generator = new bloom.Generator();

        generator.add(textEncoder.encode('')); // Empty string

        const bitsPerKey = 10;
        const k = bloom.calculateK(bitsPerKey);

        const filter = generator.generate(bitsPerKey, k);

        expect(filter.contains(textEncoder.encode(''))).toBe(true);
    });

    /**
     * Bloom filter generator tests - False positive rate case
     */
    test('Should maintain a reasonable false positive rate', () => {
        const generator = new bloom.Generator();
        const numKeys = 1000;

        for (let i = 0; i < numKeys; i++) {
            generator.add(textEncoder.encode(`key${i}`));
        }

        const bitsPerKey = 10;
        const k = bloom.calculateK(bitsPerKey);

        const filter = generator.generate(bitsPerKey, k);

        let falsePositives = 0;
        const numTests = 1000;

        for (let i = 0; i < numTests; i++) {
            if (filter.contains(textEncoder.encode(`falseKey${i}`))) {
                falsePositives++;
            }
        }

        const falsePositiveRate = falsePositives / numTests;

        // Uncomment for false positive rate percentage
        // console.debug(`False positive rate: ${falsePositiveRate * 100}%`);

        expect(falsePositiveRate).toBeLessThan(0.01);
    });
});
