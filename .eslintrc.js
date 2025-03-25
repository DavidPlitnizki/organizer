module.exports = {
  extends: [
    'expo',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['prettier', 'react', 'react-hooks'],
  rules: {
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {
    setTImeout: 'readonly',
    clearTImeout: 'readonly',
  },
};
