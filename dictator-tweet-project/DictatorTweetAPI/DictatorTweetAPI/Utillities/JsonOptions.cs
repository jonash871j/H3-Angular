using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DictatorTweetAPI.Utillities
{
    public static class JsonSettings
    {
        public static JsonSerializerSettings DefaultSettings => new JsonSerializerSettings
        {
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            },
            Formatting = Formatting.Indented
        };
    }
}
