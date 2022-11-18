import '../src/scss/main.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      includeNames: true,
      order: ['Atoms', 'Molecules', 'Organisms', 'Page Demos'],
    },
  },
};
