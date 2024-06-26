import { RLP } from '@vechain/sdk-core';
import { expect } from 'expect';

// START_SNIPPET: RlpSnippet

// 1 - Define the profile for tx clause structure

const profile = {
    name: 'clause',
    kind: [
        { name: 'to', kind: new RLP.OptionalFixedHexBlobKind(20) },
        { name: 'value', kind: new RLP.NumericKind(32) },
        { name: 'data', kind: new RLP.HexBlobKind() }
    ]
};

// 2 - Create clauses

const clause = {
    to: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed',
    value: 10,
    data: '0x'
};

// 3 - RLP Instance to encode and decode

const rlp = new RLP.Profiler(profile);

// Encoding and Decoding
const data = rlp.encodeObject(clause);
const obj = rlp.decodeObject(data);

// END_SNIPPET: RlpSnippet

expect(data.toString('hex')).toBe(
    'd7947567d83b7b8d80addcb281a71d54fc7b3364ffed0a80'
);
expect(JSON.stringify(obj)).toBe(JSON.stringify(clause));
