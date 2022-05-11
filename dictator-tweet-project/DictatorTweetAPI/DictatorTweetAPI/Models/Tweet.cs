using System;

namespace DictatorTweetAPI.Models
{
    public class Tweet
    {
        public DateTime DateTime { get; set; }
        public string Author { get; set; } = string.Empty;
        public string Message { get; set; }
    }
}
