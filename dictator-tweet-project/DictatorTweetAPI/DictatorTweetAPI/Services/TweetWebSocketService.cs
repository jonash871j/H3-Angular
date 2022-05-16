using DictatorTweetAPI.Models;
using DictatorTweetAPI.Utillities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Sockets;

namespace DictatorTweetAPI.Services
{
    public interface ITweetSocketService
    {
        void Start();
        void Stop();
    }

    public class TweetWebSocketService : GenericSocket, ITweetSocketService
    {
        private readonly ILogger<TweetWebSocketService> logger;
        private readonly ITweetService tweetService;

        public TweetWebSocketService(
            ILogger<TweetWebSocketService> logger,
            ITweetService tweetService)
        {
            IPAddress = IPAddressUtillity.GetLocalIPAddress();
            Port = 81;
            MaxRequestBufferSize = 1024;
            this.logger = logger;
            this.tweetService = tweetService;
        }

        protected override void SendResponse(byte[] requestData, Socket clientSocket)
        {
            WebSocketResponder webSocketResponder = new(requestData, clientSocket);
            if (webSocketResponder.IsHandshake())
            {
                webSocketResponder.HandshakeResponse();
            }
            else
            {
                List<Tweet> tweets = tweetService.GetTweets();
                webSocketResponder.MessageResponse(JsonConvert.SerializeObject(tweets, JsonSettings.DefaultSettings));
            }
        }

        protected override void ServerInfo(string message)
        {
            logger.LogInformation("[TweetSocketService] " + message);
        }
    }
}
