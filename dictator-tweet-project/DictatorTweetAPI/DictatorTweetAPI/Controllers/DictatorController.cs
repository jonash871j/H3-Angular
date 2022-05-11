using DictatorTweetAPI.Models;
using DictatorTweetAPI.Services;
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

        [HttpPut]
        public ActionResult<bool> Put(Dictator dictator)
        {
            return dictatorService.AddDictator(dictator);
        }
    }
}
