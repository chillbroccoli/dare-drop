import { PrismaClient } from "@prisma/client";

import { __PROD__ } from "../constants";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (!__PROD__) globalForPrisma.prisma = prisma;
