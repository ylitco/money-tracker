import { render } from '@testing-library/react';

import MoneyTrackerUiKit from './ui-kit';

describe('MoneyTrackerUiKit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MoneyTrackerUiKit />);
    expect(baseElement).toBeTruthy();
  });
});
