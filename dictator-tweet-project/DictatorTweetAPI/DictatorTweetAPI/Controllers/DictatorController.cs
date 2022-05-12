using DictatorTweetAPI.Models;
using DictatorTweetAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DictatorTweetAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DictatorController : ControllerBase
    {
        private readonly IDictatorService dictatorService;

        public DictatorController(IDictatorService dictatorService)
        {
            this.dictatorService = dictatorService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Dictator>> Get()
        {
            return dictatorService.GetDictators();
        }

        [HttpPost]
        public ActionResult<bool> Post(Dictator dictator)
        {
            if (!dictatorService.AddDictator(dictator))
            {
                Response.StatusCode = 403;
                return false;
            }
            return true;
        }
    }
}
