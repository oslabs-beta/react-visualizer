import { describe, expect, test } from '@jest/globals';
import { Message } from 'types';

describe('Message type', () => {
  test('should allow strings', () => {
    const message: Message = 'Hello, world!';
    expect(typeof message).toBe('string');
  });
});
