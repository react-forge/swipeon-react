import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'dark',
    brandTitle: 'SwipeOn React',
    brandUrl: 'https://github.com/react-forge/swipeon-react',
    brandImage: undefined,
    brandTarget: '_blank',
    
    // UI
    colorPrimary: '#e879f9',
    colorSecondary: '#a855f7',
    
    // Background
    appBg: '#0f0f23',
    appContentBg: '#1a1a2e',
    appBorderColor: '#374151',
    appBorderRadius: 8,
    
    // Typography
    fontBase: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontCode: '"JetBrains Mono", "Fira Code", monospace',
    
    // Text
    textColor: '#f3f4f6',
    textInverseColor: '#0f0f23',
    textMutedColor: '#9ca3af',
    
    // Toolbar
    barTextColor: '#9ca3af',
    barSelectedColor: '#e879f9',
    barHoverColor: '#c084fc',
    barBg: '#1a1a2e',
    
    // Form
    inputBg: '#1f2937',
    inputBorder: '#374151',
    inputTextColor: '#f3f4f6',
    inputBorderRadius: 6,
  }),
});

