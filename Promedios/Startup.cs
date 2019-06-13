using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Promedios.Startup))]
namespace Promedios
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
   
        }
    }
}
