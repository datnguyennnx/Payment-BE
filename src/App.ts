import { Server } from "./server"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const app = new Server()
app.start() 
app.bootstrap().catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
});