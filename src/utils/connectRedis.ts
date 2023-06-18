import { createClient } from 'redis';
import Consola from 'consola'

const redisUrl = 'redis://localhost:6379';
const logger = Consola 

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.success('Redis client connect successfully');
    redisClient.set('try', 'Welcome to Express and TypeScript with Prisma');
  } catch (error) {
    logger.error(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;

