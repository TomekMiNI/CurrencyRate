using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Invest;
namespace lab4.Controllers 
{
    public class LabController : Controller
    {
        [HttpPost]
        public IActionResult SaveTransaction([FromBody] Transaction t)
        {
            //NoContent
            Invest.DatabaseMock.saveTransaction(new Transaction(t.exchangeRate, t.currencyCode, t.quantity));
            return NoContent();
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            //Ok
            return Ok(Invest.DatabaseMock.getAll());
        }
        [HttpDelete]
        public IActionResult DeleteAll()
        {
            Invest.DatabaseMock.deleteAll();
            return NoContent();
        }
    }
}
