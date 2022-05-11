using DictatorTweetAPI.Models;
using DictatorTweetAPI.Utillities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;

namespace DictatorTweetAPI.Services
{
    public interface ITweetSocketService
    {
        void Start();
        void Stop();
    }

    public class TweetSocketService : GenericSocket, ITweetSocketService
    {
        private readonly ILogger<TweetSocketService> logger;
        private readonly ITweetService tweetService;

        public TweetSocketService(
            ILogger<TweetSocketService> logger,
            ITweetService tweetService)
        {
            IPAddress = IPAddressUtillity.GetLocalIPAddress();
            Port = 81;
            MaxRequestBufferSize = 2048;
            this.logger = logger;
            this.tweetService = tweetService;
        }

        protected override void SendResponse(string requestData, Socket clientSocket)
        {
            string author = requestData; // Request data only contains an author name
            List<Tweet> tweets = tweetService.GetTweetsByAuthor(author);
            string json = JsonConvert.SerializeObject(tweets);
            byte[] jsonBytes = Encoding.ASCII.GetBytes(json);

            clientSocket.Send(jsonBytes);
        }

        protected override void ServerInfo(string message)
        {
            logger.LogInformation("[TweetSocketService] " + message);
        }
    }
}
