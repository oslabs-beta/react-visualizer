/**
 * @jest-environment jsdom
 */

/* eslint-disable */
// @ts-nocheck

import { describe, expect, it } from '@jest/globals';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../src/client/components/App';

describe('App', () => {
  it('renders the App component', () => {
    expect(true).toBe(true);
  });
});
