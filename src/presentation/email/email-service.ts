import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log-repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendMailOptions {
    to: string | string[],
    subject: string,
    htmlBody: string,
    attachements: Attachment[],
}

//* Definir attachements
interface Attachment {
    filename?: string,
    path?: string,
}


export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMIAL,
            pass: envs.MAILER_SECRET_KEY,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    constructor(){}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachements = [] } = options;
        try {
            const sendIformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements
            });
            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts'
            });
            // console.log(sendIformation);
            return true;
        } catch (error) {
            // console.log(error)
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent',
                origin: 'email.service.ts'
            });
            return false;
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `<h3>Log de sistema - NOC</h3>
         <p>asjkdas kdsajdksajdk askdaksnd kjasnd jsadnjsadnk sdk sndkjkn</p>`;

        const attachements: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' }
        ];

        return this.sendEmail({
            to, subject, attachements, htmlBody
        })
    }
}