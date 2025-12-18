import type { Meta, StoryObj } from '@storybook/react-vite';
import { App } from './app';
import { withLocalization } from '../shared/storybook';
import { Primary as AccountingFormPrimaryStory } from '../entities/accounting/ui/form/Form.stories';

const meta = {
  component: App,
  decorators: [withLocalization],
  title: 'Page/Main',
} satisfies Meta<typeof App>;
export default meta;

type Story = StoryObj<typeof App>;

export const FormSubmissionWithToast = {
  name: "Fill & Submit Use Case",
  args: {},
  play: async (context) => {
    // Reuse the form filling logic from AccountingForm story
    // @ts-expect-error - Context types differ but canvasElement is compatible
    await AccountingFormPrimaryStory.play?.(context);
  },
} satisfies Story;
