module.exports = {
  apps: [
    {
      name: "vegacore",
      script: "tsx",
      args: "backend/index.ts",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "400M",
      watch: false,
    },
  ],
};
