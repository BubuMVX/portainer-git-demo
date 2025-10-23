import app from './app';
import { env } from './env';

const startServer = (): void => {
  const server = app.listen(env.PORT, () => {
    console.log(`🚀 Server started on port ${env.PORT}`);
    console.log(`📝 Message: "${env.MESSAGE}"`);
  });

  const gracefulShutdown = (signal: string) => {
    console.log(`🛑 ${signal} signal received, shutting down server...`);
    server.close(() => {
      console.log('✅ Server shut down gracefully');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
};

startServer();
