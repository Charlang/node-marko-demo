# node-marko-demo

This is a demo of [NodeJs](https://nodejs.org/en/) and
[Express](https://www.npmjs.com/package/express) based server side and
[MarkoJs](https://markojs.com/) UI library based client side application.

### Technology and library used for build this application
- NodeJs
- NPM
- Express
- MarkoJs
- Redux
- Sass
- Babel
- Webpack
- Gulp
- Mocha
- Chai

### Up and Run
Please follow below steps to setup, run, and access the application:
1. **NodeJs Install**
- Install with latest NodeJs from official site,
choose version: **10.13.0 LTS** or greater:
[https://nodejs.org/en/](https://nodejs.org/en/)
- Verify Install
    ```
    $ node -v
    v10.13.0
    $ npm -v
    6.4.1
    ```

2. **Local Development Start**

    Refer to [NVM](https://github.com/creationix/nvm) if you have
    different node version in use.
    ```
    $ npm run dev
    ...
    [Server started on port 8000 !]
    ```

    If *8000* port in use, error as below:
    ```
    Error: listen EADDRINUSE :::8000
    ```
    Then you can try below command to kill *8000 PID* and restart
    ```
    $ kill -9 $(lsof -ti tcp:8000)
    $ npm run dev
    ```
    Application can be access by: [http://localhost:8000/](http://localhost:8000/)

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
    Here only list command for local Docker test, but with the image you
    simply scale with Kubernetes or any other cloud.
    ```
    $ docker run -p 8000:8000 -d node-marko-demo
    ```

### Solution and Feature list

1. **Solution**

    This Application is leverage *NodeJs* and *Express* as server side
    environment, build *dynamic page* and respond to browser client request,
    while integrate with BE service on server side, expose *REST API* endpoints
    to support client ajax call.

    At client side, it's interact as a *mobile friendly* single page app,
    after page loaded, all user interaction happen inside without refresh,
    by leverage *Marko* UI component and *Redux* library to main state and
    bind page update, client side only check for empty values and
    leverage *server side validation* for data consistent check,
    all those happen on [Fetch](https://www.npmjs.com/package/whatwg-fetch)
    ajax call, which hidden the complexity and validation implementation
    from browser for *performance* and *security* concern.

2. **Features list**

    Beyond requirements, this simple yet clean application is flexible.

    * Separate Test / Development / Production build and running environments.
    * Server side response are compress with *gzip* and assets using *hashed* file
      name for version control.
    * API call secured with *CSRF* implementation.
    * Setup as single page application but can easy be expand to support multiple pages.
    * Localization is consider properly with *content-language* and cookie based server side solution.
    * Most of SEO content are setup and with server side rendering to make the page search friendly.
    * Development friendly with eslint and gulp watch.
    * *MarkoJs* are similar with *React* and could be migrate with small effort.

### Changes history
    Version1.0.0

### License
    Apache License Version 2.0, January 2004
