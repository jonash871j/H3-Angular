using System;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace DictatorTweetAPI.Utillities
{
    public class WebSocketResponder
    {
        private readonly Socket clientSocket;
        private readonly byte[] requestData;

        public WebSocketResponder(byte[] requestData, Socket clientSocket)
        {
            this.requestData = requestData;
            this.clientSocket = clientSocket;
        }

        public void HandshakeResponse()
        {
            // Gets the Sec-WebSocket-Key header value
            string swk = Regex.Match(Encoding.UTF8.GetString(requestData), "Sec-WebSocket-Key: (.*)").Groups[1].Value.Trim();
            
            string swka = swk + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
            byte[] swkaSha1 = SHA1.Create().ComputeHash(Encoding.UTF8.GetBytes(swka));
            string swkaSha1Base64 = Convert.ToBase64String(swkaSha1);

            // HTTP/1.1 defines the sequence CR LF as the end-of-line marker
            byte[] response = Encoding.UTF8.GetBytes(
                "HTTP/1.1 101 Switching Protocols\r\n" +
                "Connection: Upgrade\r\n" +
                "Upgrade: websocket\r\n" +
                "Sec-WebSocket-Accept: " + swkaSha1Base64 + "\r\n\r\n");

            clientSocket.Send(response);
        }

        public void MessageResponse(string message)
        {
            clientSocket.Send(FrameConverter.GetFrameFromString(message));
        }

        public bool IsHandshake()
        {
            return Regex.IsMatch(Encoding.UTF8.GetString(requestData), "^GET", RegexOptions.IgnoreCase);
        }
    }
}
