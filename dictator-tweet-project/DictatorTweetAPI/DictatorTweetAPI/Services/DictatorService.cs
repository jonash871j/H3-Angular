using DictatorTweetAPI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace DictatorTweetAPI.Services
{
    public interface IDictatorService
    {
        bool AddDictator(Dictator dictator);
        List<Dictator> GetDictators();
    }

    public class DictatorService : IDictatorService
    {
        private static Random random = new();
        private const string FileName = "dictators.json";
        private readonly ITweetService tweetService;

        public DictatorService(ITweetService tweetService)
        {
            this.tweetService = tweetService;
        }

        public List<Dictator> GetDictators()
        {
            if (!File.Exists(FileName))
            {
                return new List<Dictator>();
            }
            string fileData = File.ReadAllText(FileName);
            return JsonConvert.DeserializeObject<List<Dictator>>(fileData);
        }

        public bool AddDictator(Dictator dictator)
        {
            List<Dictator> dictators = GetDictators();
            if (dictators.Exists(d => d.FullName == dictator.FullName) || !dictator.IsValid())
            {
                return false;
            }

            dictators.Add(dictator);
            string json = JsonConvert.SerializeObject(dictators, Formatting.Indented);
            File.WriteAllText(FileName, json);
            tweetService.AsignAuthorToRandomTweets(dictator.FullName, random.Next(6, 14));
            return true;
        }
    }
}
