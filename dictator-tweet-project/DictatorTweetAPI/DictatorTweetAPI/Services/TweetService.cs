using DictatorTweetAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace DictatorTweetAPI.Services
{
    public interface ITweetService
    {
        List<Tweet> GetTweets();
    }

    public class TweetService : ITweetService
    {
        private const string FileName = "tweets.json";
        private readonly IDictatorService dictatorService;
        private readonly Random random = new();
        private List<Tweet> asignedTweets = new();
        private List<Tweet> allTweets = new();

        public TweetService(IDictatorService dictatorService)
        {
            this.dictatorService = dictatorService;

            LoadTweets();
        }

        public List<Tweet> GetTweets()
        {
            AsignTweets();
            return asignedTweets;
        }

        private void AsignTweets()
        {
            if (!allTweets.Any())
            {
                return;
            }

            foreach (Dictator dictator in dictatorService.GetDictators())
            {
                // 1/50 chance that a dictator gets asigned a new tweet
                if (random.Next(0, 50) != 25)
                {
                    continue;
                }
                Tweet tweet = allTweets[0];
                tweet.DateTime = DateTime.Now.ToString();
                tweet.Author = dictator.FullName;
                asignedTweets.Add(tweet);
                allTweets.RemoveAt(0);
            }
        }

        private void LoadTweets()
        {
            if (!File.Exists(FileName))
            {
                return;
            }

            string json = File.ReadAllText(FileName);
            allTweets = JsonConvert.DeserializeObject<List<Tweet>>(json);

            foreach (Tweet tweet in allTweets)
            {
                tweet.Author = null;
            }
        }
    }
}
