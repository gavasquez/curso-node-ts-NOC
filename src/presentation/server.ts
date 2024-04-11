import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-sysytem.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource(),
);
const emailService = new EmailService();


export class Server {
    public static start() {
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