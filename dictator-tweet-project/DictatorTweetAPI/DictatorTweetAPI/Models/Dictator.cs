namespace DictatorTweetAPI.Models
{
    public class Dictator
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Desciption { get; set; }

        public string GetFullName()
        {
            return FirstName + " " + LastName;
        }
    }
}
