module.exports = {
    apps : [{
      name: "qah-habladores-precio-web",
      script: "./src/index.js",
      env: {
        NODE_ENV: "development",
        VERSION: "1.2.2",
      },
      env_production: {
        NODE_ENV: "production",
        VERSION: "1.2.2",
      }
    }]
  }