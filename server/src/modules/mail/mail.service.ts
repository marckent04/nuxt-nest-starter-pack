import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async registerSuccessful(user: User): Promise<void> {

        try {
            await this.mailerService
                .sendMail({
                    to: user.email,
                    subject: 'Welcome To App',
                    // template: __dirname + '/templates/welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                    html: '<h1> Welcome ' + user.name + '</h1> ',
                    context: {
                        name: user.name
                    },
                });
        } catch (e) {
            console.log(e);
        }
    }

    async passwordForgotten(user: User, newPassword: string): Promise<void> {

        try {
            await this.mailerService
                .sendMail({
                    to: user.email,
                    subject: 'Nouveau mot de passe',
                    // template: __dirname + '/templates/welcome', // The `.pug`, `.ejs` or `.hbs` extension is appended automatically.
                    html: '<h1>Veuillez-vous connecteer avec votre nouveau mot de passe: <br />' + newPassword + '</h1> ',
                    context: {
                        name: user.name
                    },
                });
        } catch (e) {
            console.log(e);
        }
    }
}
