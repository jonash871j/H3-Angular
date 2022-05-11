using DictatorTweetAPI.Models;
using System.Collections.Generic;

namespace DictatorTweetAPI.Services
{
    public interface ITweetService
    {
        bool AsignAuthorToRandomTweets(string author, int tweetAmount);
        List<Tweet> GetTweetsByAuthor(string author);
    }

    public class TweetService : ITweetService
    {
        public List<Tweet> GetTweetsByAuthor(string author)
        {
            return new List<Tweet>()
            {
                new Tweet
                {
                    Author = author,
                    DateTime = System.DateTime.Now,
                    Message = "Dont care"
                }
            };
        }

        public bool AsignAuthorToRandomTweets(string author, int tweetAmount)
        {
            return false;
        }
    }
}
