// PM2 Configuration for Hostinger/VPS Deployment
module.exports = {
  apps: [
    {
      name: 'medi-ai-backend',
      script: './web/Backend/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5002,
        HOST: '0.0.0.0'
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      log_file: './logs/backend-combined.log',
      time: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      watch: false,
      ignore_watch: ['node_modules', 'logs', '.git'],
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
