import { render } from '@testing-library/react';

import MoneyTrackerUiSdk from './ui-sdk';

describe('MoneyTrackerUiSdk', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MoneyTrackerUiSdk />);
    expect(baseElement).toBeTruthy();
  });
});
