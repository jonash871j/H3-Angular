using DictatorTweetAPI.Models;
using DictatorTweetAPI.Utillities;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Sockets;
using System.Reflection.Emit;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

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
                string author = FrameConverter.GetStringFromFrame(requestData);
                List<Tweet> tweets = tweetService.GetTweetsByAuthor(author);
                webSocketResponder.MessageResponse(JsonConvert.SerializeObject(tweets));
            }
        }

        protected override void ServerInfo(string message)
        {
            logger.LogInformation("[TweetSocketService] " + message);
        }
    }
}
