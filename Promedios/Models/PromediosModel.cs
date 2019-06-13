using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Promedios.Models
{
    public class PromediosModel
    {
        [Required(ErrorMessage = "Please select file")]
        public HttpPostedFileBase file { get; set; }
    }
}