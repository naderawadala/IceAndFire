using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using MongoDB.Bson;
using System.Runtime.Serialization;
using HotChocolate.Language;
using SerializationException = HotChocolate.Types.SerializationException;

namespace IceAndFire.Domain
{
    public class ObjectIdType : ScalarType<ObjectId, StringValueNode>
    {
        public ObjectIdType() : base("ObjectId")
        {
        }

        public override IValueNode ParseResult(object resultValue)
        {
            if (resultValue is ObjectId objectId)
            {
                return new StringValueNode(objectId.ToString());
            }

            throw new SerializationException("Unable to parse the result as an ObjectId.", this);
        }

        protected override ObjectId ParseLiteral(StringValueNode valueSyntax)
        {
            if (valueSyntax is StringValueNode stringValue)
            {
                return ObjectId.Parse(stringValue.Value);
            }

            throw new SerializationException("Unable to parse the value as an ObjectId.", this);
        }

        protected override StringValueNode ParseValue(ObjectId runtimeValue)
        {
            if (runtimeValue is ObjectId objectId)
            {
                return new StringValueNode(objectId.ToString());
            }

            throw new SerializationException("Unable to parse the value as an ObjectId.", this);
        }

        public override object Serialize(object value)
        {
            if (value is ObjectId objectId)
            {
                return objectId.ToString();
            }

            throw new SerializationException("Unable to serialize the value as an ObjectId.", this);
        }
    }

}
