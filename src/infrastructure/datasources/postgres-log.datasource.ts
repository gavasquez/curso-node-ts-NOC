import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log-datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    high: SeverityLevel.HIGH,
    medium: SeverityLevel.MEDIUM,
}

export class PostgresLogDatasource implements LogDataSource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: level,
            }
        });
        console.log(newLog);

    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const logs = await prisma.logModel.findMany({
            where: {
                level
            }
        });
        return logs.map(log => LogEntity.fromObject(log));

    }

}