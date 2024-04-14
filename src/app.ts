import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
// Configuracion dotenv variables de entorno
// import 'dotenv/config';


(async () => {
    main();
})();

async function main() {
    await MongoDatabase.connect({mongoUrl: envs.MONGO_URL, dbName: envs.MONGO_DB_NAME});

    //const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'HIGH',
    //         message: 'Test Message',
    //         origin: 'App.ts',
    //     }
    // });
    // console.log({newLog});

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // });
    // console.log(logs)

    // Grabar o Crear registro
    // const newLog = await LogModel.create({
    //     message: 'Test Message desde Mongo',
    //     origin: 'App.ts',
    //     level: 'low'
    // });
    // await newLog.save();
    // console.log(newLog);
    // const logs = await LogModel.find();
    // console.log(logs);
    Server.start();
    // console.log(envs.PORT);
}