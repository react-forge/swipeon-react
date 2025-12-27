import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        },
        {
          name: 'dark',
          value: '#0f0f23',
        },
        {
          name: 'light',
          value: '#f5f5f5',
        },
      ],
    },
    layout: 'centered',
  },
};

export default preview;

