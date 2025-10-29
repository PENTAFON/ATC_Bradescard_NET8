using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Bradescard.Utils
{
    public class BradescoApi
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        private readonly string _token;

        

        public BradescoApi(IConfiguration configuration)
        {
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
            };

            _httpClient = new HttpClient(handler);

            _baseUrl = configuration["BradescoApi:BaseUrl"];
            _token = configuration["BradescoApi:BearerToken"];

            if (string.IsNullOrEmpty(_baseUrl))
                throw new Exception("BradescoApi:BaseUrl no está configurada en appsettings.json.");

            if (string.IsNullOrEmpty(_token))
                throw new Exception("BradescoApi:BearerToken no está configurado en appsettings.json.");

            _httpClient.BaseAddress = new Uri(_baseUrl);
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _token);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);

     
        }

        public async Task<string> GetAsync(string endpoint, string parametro = "")
        {



            string cleanBase = _baseUrl.TrimEnd('/');
            string cleanEndpoint = endpoint.Trim('/');
            string cleanParam = parametro.Trim('/');

            string url = string.IsNullOrEmpty(cleanParam)
                ? $"{cleanBase}/{cleanEndpoint}"
                : $"{cleanBase}/{cleanEndpoint}/{cleanParam}";


            using (var request = new HttpRequestMessage(HttpMethod.Get, url))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _token);
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

         
                    using (var response = await _httpClient.SendAsync(request))
                    {
                        var content = await response.Content.ReadAsStringAsync();



                        if (!response.IsSuccessStatusCode)
                            throw new Exception($"Error API ({response.StatusCode}): {content}");

                        return content;
                    }
               
            }
        }

      
    }
}
