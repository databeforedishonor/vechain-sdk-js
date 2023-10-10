import { type ethers } from 'ethers';

/**
 * Represents a wrapped Param Type for ethers.js types.
 * @public
 */
type ParamType = ethers.ParamType;

/**
 * Represents a wrapped Function Fragment for ethers.js types.
 * @public
 */
type FunctionFragment = ethers.FunctionFragment;

/**
 * Represents a wrapped Interface for ethers.js types.
 * @public
 */
type Interface = ethers.Interface;

/**
 * Represents a wrapped Result for ethers.js types.
 * It represents the decoded data from a transaction (after decoding).
 * @public
 */
type Result = ethers.Result;

/**
 * Represents a wrapped BytesLike for ethers.js types.
 * @public
 */
type BytesLike = ethers.BytesLike;

export type { ParamType, FunctionFragment, Interface, Result, BytesLike };
