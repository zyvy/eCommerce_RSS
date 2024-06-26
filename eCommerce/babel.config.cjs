module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    ['@babel/preset-react', {runtime: 'automatic'}],
    '@babel/preset-typescript',
  ],
  "transformIgnorePatterns": [
      "node_modules/(?!variables/.*)"
    ]
};