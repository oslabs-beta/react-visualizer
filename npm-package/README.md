# React-Visualizer

## Development mode

To run the app in development mode, open a terminal window and run the following command:

```
npm run dev
```

This will start both the server and the client. The server will be running on port 3000, and the client will be running on port 8080. Whenever you make changes to the server or client code, the server and client will automatically reload.

## Production build

To create a production build of the app, open a terminal window and run the following command:

```
npm run build
```

This will create a production build of the app in the build directory. The build will include both the client and server code.

To run the production build, open a terminal window and navigate to the build directory. Then, run the following command:

```
npm start
```

This will start the server in production mode. The server will be running on port 3000.

Note that in production mode, the server will serve the static files from the build/public directory, and not from the src/client directory. Therefore, any changes you make to the client code will not be reflected in the production build until you rebuild the app using npm run build.
