module.exports = {
    apps: [
        // {
        //   name: "frontend",
        //   cwd: "./frontend",
        //   script: "frontend/node_modules/.bin/react-scripts",
        //   args: "start",
        // },
        {
            name: "server",
            cwd: ".",
            script: "node_modules/.bin/babel-node",
            args: " ./server.js",
        },
    ]
};