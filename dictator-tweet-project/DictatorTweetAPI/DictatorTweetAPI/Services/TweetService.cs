using DictatorTweetAPI.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace DictatorTweetAPI.Services
{
    public interface ITweetService
    {
        void AsignAuthorToRandomTweets(string author, int tweetAmount);
        List<Tweet> GetTweetsByAuthor(string author);
    }

    public class TweetService : ITweetService
    {
        private const string FileName = "tweets.json";

        public List<Tweet> GetTweetsByAuthor(string author)
        {
            return GetTweets().FindAll(t => t.Author == author);
        }

        public void AsignAuthorToRandomTweets(string author, int tweetAmount)
        {
            List<Tweet> tweets = GetTweets();
            foreach(Tweet tweet in tweets)
            {
                if (tweet.Author == string.Empty)
                {
                    tweet.Author = author;
                    tweetAmount--;
                }
                if (tweetAmount <= 0)
                {
                    break;
                }
            }
        }

        private static List<Tweet> GetTweets()
        {
            if (!File.Exists(FileName))
            {
                return new List<Tweet>();
            }

            string fileData = File.ReadAllText(FileName);
            return JsonConvert.DeserializeObject<List<Tweet>>(fileData);
        }
    }
}
