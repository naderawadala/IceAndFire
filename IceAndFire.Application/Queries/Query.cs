using HotChocolate.Authorization;
using IceAndFire.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Queries
{
    public class Query
    {
        [Authorize]
        public string Test() {
            return "TestForNow";
        }
    }
}
