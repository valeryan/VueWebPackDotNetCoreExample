using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace VueWebpackExample.Services
{
    // This class is used by the application to send email for account confirmation and password reset.
    // For more details see https://go.microsoft.com/fwlink/?LinkID=532713
    public class EmailSender : IEmailSender
    {
        public EmailSender(IOptions<SmtpSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public SmtpSenderOptions Options { get; }

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return Execute(email, subject, message);
        }

        public Task Execute(string email, string subject, string message)
        {
            var client = new SmtpClient(Options.SmtpHost, Options.SmtpPort)
            {
                Credentials = new NetworkCredential(Options.SmtpUsername, Options.SmtpPassword),
                EnableSsl = Options.SmtpSsl
            };
            var msg = new MailMessage()
            {
                From = new MailAddress(Options.SmtpFrom),
                Subject = subject,
                Body = message
            };
            msg.To.Add(new MailAddress(email));

            return client.SendMailAsync(msg);
        }
    }
}
