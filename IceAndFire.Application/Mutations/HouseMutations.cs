using IceAndFire.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Application.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class HouseMutations
    {
        private readonly HouseService _service;
        public HouseMutations(HouseService service)
        {
            this._service = service;
        }

        public string Test()
        {
            return "test";
        }
    }
}
