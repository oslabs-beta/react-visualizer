// /**
//  * @jest-environment jsdom
//  */

/* eslint-disable */
// @ts-nocheck

import { describe, expect, it } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../../../src/client/components/App';

describe('App', () => {
  it(`displays the 'Hello from the frontend!' text`, async () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveTextContent('Hello from the frontend!');
    expect(screen.getByText('Hello from the frontend!')).toBeInTheDocument();
  });
});
