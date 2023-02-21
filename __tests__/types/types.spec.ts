import { describe, expect, it } from '@jest/globals';
import { Message } from 'types';

describe('Message type', () => {
  it('should allow strings', () => {
    const message: Message = 'Hello, world!';
    expect(typeof message).toBe('string');
  });
});
