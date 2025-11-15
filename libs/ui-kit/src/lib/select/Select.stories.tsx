import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  component: Select,
  title: 'Select',
} satisfies Meta<typeof Select>;
export default meta;

type Story = StoryObj<typeof Select>;

export const Primary = {
  args: {},
} satisfies Story;
