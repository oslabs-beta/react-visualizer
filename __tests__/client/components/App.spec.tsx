import { describe, expect, it } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../src/client/components/App';

describe('App', () => {
  it(`displays the 'Hello from the frontend!' text`, async () => {
    render(<App />);
    await screen.findByRole('paragraph');
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Hello from the frontend!'
    );
  });
});
