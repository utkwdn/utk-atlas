import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: `https://devcontent.cms.utk.edu/graphql`,
  documents: ['src/**/*.{tsx,ts}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
