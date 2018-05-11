using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
  
namespace Invest
{
    public class DatabaseMock
    {
        private static List<Transaction> entries = new List<Transaction>();
        private static int counter;

        public static Transaction getTransactionById(int id)
        {
            return entries.Find(x => x.getId() == id);
        }

        public static void saveTransaction(Transaction entry)
        {
            entry.setId(counter++);
            entries.Add(entry);
        }

        public static void deleteInvestEvent(int id)
        {
            Transaction investEvent = getTransactionById(id);
            entries.Remove(investEvent);
        }

        public static List<Transaction> getAll()
        {
            return entries;
        }

        public static void deleteAll()
        {
            entries = new List<Transaction>();
        }

    }
}