import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'development',
  entry: {
    app: './src/client/index.tsx',
    background: './src/extensions/background.js',
    content: './src/extensions/contentScript.js',
  },
  output: {
    path: path.resolve(__dirname, 'build/public'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [/node_modules/],
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'cheap-module-source-map',
};
