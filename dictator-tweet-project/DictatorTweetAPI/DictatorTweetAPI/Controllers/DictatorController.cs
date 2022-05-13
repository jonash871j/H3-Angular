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

        [HttpGet("{fullName}")]
        public ActionResult<Dictator> Get(string fullName)
        {
            return dictatorService.GetDictator(fullName);
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

        [HttpPut("{fullName}")]
        public ActionResult<bool> Update(string fullName, Dictator dictator)
        {
            if (!dictatorService.UpdateDictator(fullName, dictator))
            {
                Response.StatusCode = 403;
                return false;
            }
            return true;
        }

        [HttpDelete("{fullName}")]
        public ActionResult<bool> Delete(string fullName)
        {
            if (!dictatorService.DeleteDictator(fullName))
            {
                Response.StatusCode = 403;
                return false;
            }
            return true;
        }
    }
}
