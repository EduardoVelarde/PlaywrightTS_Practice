1.- Create  a new spec file called `multi.window.spec.ts` under my functional folder
2.- And Capture the flows as below:
    -Navigate to the site: `https://the-internet.herokuapp.com/`
    -Click on "Multiple Windows"
    -Navigate to the newly opened windows and asser the header
    -Click the link on that new window
    -Navigate to the next window that is opened
    -Assert the header text
    -Comeback to the parent window
3.- Add a new  key in `package.json` file
4.- And run the spec in `headed` node