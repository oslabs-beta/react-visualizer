const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
    library: 'CreactVisualizer',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    'react-reconciler': {
      commonjs: 'react-reconciler',
      commonjs2: 'react-reconciler',
      amd: 'ReactReconciler',
      root: 'ReactReconciler',
    },
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!bundle.js',
        '!bundle.js.map',
        '!bundle.js.LICENSE.txt',
        '!bundle.d.ts',
      ],
    }),
  ],
};
