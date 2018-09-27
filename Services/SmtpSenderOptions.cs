using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueWebpackExample.Services
{
    public class SmtpSenderOptions
    {
        public string SmtpHost { get; set; }
        public int SmtpPort { get; set; }
        public string SmtpUsername { get; set; }
        public string SmtpPassword { get; set; }
        public bool SmtpSsl { get; set; }
        public string SmtpFrom { get; set; }
    }
}
