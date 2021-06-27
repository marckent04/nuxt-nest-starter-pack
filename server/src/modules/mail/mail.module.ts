import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

const config = {
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  },
  defaults: {
    from: 'Cakes Market',
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new EjsAdapter(),
    options: {
      strict: true,
    },
  },
};
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "fd4f4d76da80be",
          pass: "f169788f406f93"
        }
      },
      defaults: {
        from: 'Cakes Market',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
