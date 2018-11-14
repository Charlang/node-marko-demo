# node-marko-demo

This is a demo of [NodeJs](https://nodejs.org/en/) and [Express](https://www.npmjs.com/package/express) based server side and [MarkoJs](https://markojs.com/) UI library based client side application.

### Technology and library used for build this application
- NodeJs
- NPM
- Express
- MarkoJs
- Sass
- Babel
- Webpack
- Gulp

### Up and Run
Please follow below step to setup, run, and access the application:
1. **NodeJs Install**
- Install with latest NodeJs from official site, choose version: **10.13.0 LTS**:
[https://nodejs.org/en/](https://nodejs.org/en/)
- Verify Install
    ```
    $ node -v
    v10.13.0
    $ npm -v
    6.4.1
    ```

2. **Local Development Start**

    Refer to [NVM](https://github.com/creationix/nvm) if you have different node version in use.
    ```
    $ npm run dev
    ...
    [Server started on port 8000 !]
    ```

    If 8000 port in use, error as below:
    ```
    Error: listen EADDRINUSE :::8000
    ```
    Then you can try below command to kill 8000 PID and restart
    ```
    $ kill -9 $(lsof -ti tcp:8000)
    $ npm run dev
    ```

3. **Unit and Integration Test**
    ```
    $ npm test
    ```

4. **Production**

    Build
    ```
    $ npm install

    $ npm run build
    ```
    Start Application
    ```
    $ npm run prod
    ```

5. **Cloud Deployment**
    By leverage Docker build, and tag then push to Docker repository
    ```
    $ docker build -t node-marko-demo .
    ```
    Here only list command for local Docker test, but with the image you simply scale with Kubernetes or any other cloud.
    ```
    $ docker run -p 8000:8000 -d node-marko-demo
    ```
    
