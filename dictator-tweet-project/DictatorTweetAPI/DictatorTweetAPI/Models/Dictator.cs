using Newtonsoft.Json;

namespace DictatorTweetAPI.Models
{
    public class Dictator
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        public string FullName => FirstName + " " + LastName;

        public bool IsValid()
        {
            return !string.IsNullOrWhiteSpace(FirstName) && !string.IsNullOrWhiteSpace(LastName);
        }
    }
}
