import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'development',
  // entry: './src/client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build', 'public'),
    // filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: {
      directory: path.join(__dirname, 'build', 'public'),
    },
  },
};
