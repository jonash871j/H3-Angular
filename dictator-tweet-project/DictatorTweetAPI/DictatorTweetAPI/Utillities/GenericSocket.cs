using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace DictatorTweetAPI.Utillities
{
    public abstract class GenericSocket
    {
        private readonly Socket serverSocket;
        private readonly Thread serverThread;
        private readonly ManualResetEvent manualResetEvent;

        public GenericSocket()
        {
            serverSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            serverThread = new Thread(ServerThreadEntry);
            manualResetEvent = new ManualResetEvent(false);
        }

        protected bool IsRunning { get; private set; } = false;
        protected int MaxRequestBufferSize { get; set; } = 8192;
        protected IPAddress IPAddress { get; set; } = null;
        protected ushort Port { get; set; } = 1000;

        public void Start()
        {
            if (IPAddress == null)
            {
                ServerInfo("Failed to start server because no IPAddress was specified");
                return;
            }

            try
            {
                // Bind ip and port to server socket
                serverSocket.Bind(new IPEndPoint(IPAddress, Port));

                // Listen up to 10 clients
                serverSocket.Listen(10);

                // Starts server thread
                IsRunning = true;
                serverThread.Start();
            }
            catch (Exception ex)
            {
                ServerInfo($"Failed to start server on port {Port}: {ex.Message}");
            }
        }

        public void Stop()
        {
            if (IsRunning)
            {
                ServerInfo("Server is closing...");

                // Joins thread and closes socket
                IsRunning = false;
                serverThread.Join();
                serverSocket.Close();
            }
        }

        protected abstract void ServerInfo(string message);
        protected abstract void SendResponse(byte[] requestData, Socket clientSocket);

        private void ServerThreadEntry()
        {
            ServerInfo($"Server started on port {Port}");

            while (IsRunning)
            {
                // Begin accepting a new client
                serverSocket.BeginAccept(new AsyncCallback(OnClientRequest), serverSocket);

                // Waits until a client tries to connect
                manualResetEvent.WaitOne();
                manualResetEvent.Reset();
            }
        }

        private void OnClientRequest(IAsyncResult ar)
        {
            try
            {
                // The clients has tried to connect continue in server thread 
                manualResetEvent.Set();
                Socket clientSocket = ((Socket)ar.AsyncState).EndAccept(ar);

                // Gets the client request data
                while (true)
                {
                    byte[] requestData = GetRequest(clientSocket);

                    // Sends server response to client
                    SendResponse(requestData, clientSocket);
                }
            }
            catch(Exception ex)
            {
                ServerInfo("Client socket error: " + ex.Message);
            }
        }

        private byte[] GetRequest(Socket clientSocket)
        {
            byte[] readBuffer = new byte[MaxRequestBufferSize];
            int receivedByteAmount = clientSocket.Receive(readBuffer);
            ServerInfo($"Data amount recived from client: {receivedByteAmount} ");

            byte[] returnBuffer = new byte[receivedByteAmount];
            Array.Copy(readBuffer, returnBuffer, receivedByteAmount);
            return returnBuffer;
        }
    }
}
