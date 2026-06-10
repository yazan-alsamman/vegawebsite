module.exports = {
  apps: [
    {
      name: "vegacore-api",
      script: "tsx",
      args: "server/index.ts",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "300M",
    },
  ],
};
