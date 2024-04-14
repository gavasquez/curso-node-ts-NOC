import { log } from "console";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sysytem.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

// const LogRepository = new LogRepositoryImpl(
//     new FileSystemDataSource(),
//     new MongoLogDatasource(),
//     new PostgresLogDatasource(),
// );
const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);
const emailService = new EmailService();


export class Server {
    public static async start() {
        console.log('Server started...');

        // Mandar email
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(['gustavo.vasquez@corhuila.edu.co']);


        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs(['gustavo.vasquez@corhuila.edu.co']);
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs({
        //     to: 'gustavo.vasquez@corhuila.edu.co',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //     <h3>Log de sistema - NOC</h3>
        //     <p>asjkdas kdsajdksajdk askdaksnd kjasnd jsadnjsadnk sdk sndkjkn</p>
        //     `
        // });

        // const logs = await LogRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);
        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // new CheckService().execute('https://google.com');
                const url = 'http://google.com';
                new CheckServiceMultiple(
                    // fileSystemLogRepository,
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok!`),
                    (error) => console.log(error),
                ).execute(url);
            }
        );
    }
}