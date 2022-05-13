using DictatorTweetAPI.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace DictatorTweetAPI.Services
{
    public interface IDictatorService
    {
        bool AddDictator(Dictator dictator);
        bool DeleteDictator(string fullName);
        Dictator GetDictator(string fullName);
        List<Dictator> GetDictators();
        bool UpdateDictator(string fullName, Dictator dictator);
    }

    public class DictatorService : IDictatorService
    {
        private const string FileName = "dictators.json";
        private List<Dictator> dictators = new();

        public DictatorService()
        {
            ReadDictators();
        }

        public List<Dictator> GetDictators()
        {
            return dictators;
        }

        public Dictator GetDictator(string fullName)
        {
            return GetDictators()
                .FindAll(d => d.FullName == fullName)
                .SingleOrDefault();
        }

        public bool AddDictator(Dictator dictator)
        {
            if (!dictators.Exists(d => d.FullName == dictator.FullName) && dictator.IsValid())
            {
                dictators.Add(dictator);
                UpdateJson();
                return true;
            }
            return false;
        }

        public bool UpdateDictator(string fullName, Dictator dictator)
        {
            if (DeleteDictator(fullName))
            {
                return AddDictator(dictator);
            }
            return false;
        }

        public bool DeleteDictator(string fullName)
        {
            if (dictators.Exists(d => d.FullName == fullName))
            {
                dictators.RemoveAll(d => d.FullName == fullName);
                UpdateJson();
                return true;
            }
            return false;
        }

        private void ReadDictators()
        {
            if (!File.Exists(FileName))
            {
                dictators = new List<Dictator>();
            }
            else
            {
                string fileData = File.ReadAllText(FileName);
                dictators = JsonConvert.DeserializeObject<List<Dictator>>(fileData);
            }
        }

        private void UpdateJson()
        {
            string json = JsonConvert.SerializeObject(dictators, Formatting.Indented);
            File.WriteAllText(FileName, json);
        }
    }
}
