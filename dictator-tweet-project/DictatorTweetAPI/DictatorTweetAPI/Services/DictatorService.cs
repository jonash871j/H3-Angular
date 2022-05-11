using DictatorTweetAPI.Models;
using Newtonsoft.Json;
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
        private const string FileName = "dictators.json";

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
            if (dictators.Exists(d => d.GetFullName() == dictator.GetFullName()))
            {
                return false;
            }

            dictators.Add(dictator);
            string json = JsonConvert.SerializeObject(dictators);
            File.WriteAllText(FileName, json);
            return true;
        }
    }
}
