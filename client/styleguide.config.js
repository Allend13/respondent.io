module.exports = {
  ignore: ['**/__tests__/**', '**/ItemTypes.js', '**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts', '**/index.js','/dnd'],
  sections: [
    {
      name: 'UI Components',
      components: 'src/components/ui/**/*.{js,jsx,ts,tsx}'
    },
    {
      name: 'Companies Components',
      components: 'src/components/Companies/**/*.{js,jsx,ts,tsx}'
    },
    {
      name: 'Login',
      components: 'src/components/Login/**/*.{js,jsx,ts,tsx}'
    },
    {
      name: 'Questions Components',
      components: 'src/components/Questions/**/*.{js,jsx,ts,tsx}'
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        },
        {
          test: /\.less$/,
          loaders: [
            'style-loader',
            'css-loader',
            'less-loader?precision=10'
          ]
        }
      ]
    }
  }
};