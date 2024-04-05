import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sysytem.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
   new FileSystemDataSource(),
);


export class Server {
    public static start() {
        console.log('Server started...');

        // Mandar email


        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // new CheckService().execute('https://google.com');
        //         const url = 'http://localhost:3000';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok!`),
        //             (error) => console.log(error),
        //         ).execute(url);
        //     }
        // );
    }
}