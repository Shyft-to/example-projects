import { ShyftSdk, Network } from "@shyft-to/js";
import { NextResponse } from "next/server";

const shyftClient = new ShyftSdk({
  apiKey: process.env.API_KEY,
  network: Network.Devnet,
});

export const GET = async (req, res) => {
  try {
    const transactions = await getAllTransaction(process.env.RAFFLE_ADDRESS, "devnet")
    const getAggData = calculateTotalSales(transactions);
    const getBuyers = countUniqueBuyers(transactions);

    return NextResponse.json({
        transactions: transactions,
        agg_data: getAggData,
        agg_buyers: getBuyers
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

async function getAllTransaction(address, network) {
  let transactions = [];
  let oldestTxnSignature = "";
  const baseTime = new Date().toISOString();
  
  var transactionFetchComplete = false;
  try {
    while (!transactionFetchComplete) {
      var paramsToGetTransactions = {
        network: Network.Mainnet,
        account: address,
        txNum: 10,
      };
      if (oldestTxnSignature !== "")
        paramsToGetTransactions = {
          ...paramsToGetTransactions,
          beforeTxSignature: oldestTxnSignature,
        };

      const getTransactions = await shyftClient.transaction.history(
        paramsToGetTransactions
      );
    //   console.log("calling Get transactions API")

      if (getTransactions.length > 0)
        oldestTxnSignature =
          getTransactions[getTransactions.length - 1].signatures[0];

      for (let index = 0; index < getTransactions.length; index++) {
        const eachTransaction = getTransactions[index];
        if (getDifferenceISO(baseTime, eachTransaction.timestamp) !== 0) {
          transactionFetchComplete = true;
          break;
        }
        if (eachTransaction.type === "BUY_TICKETS")
          transactions.push(eachTransaction);
      }
    }
    console.log("Total Transactions that we saved: ", transactions.length);
  } catch (error) {
    console.log("Some error:", error.message);
  }
  return transactions;
}
function calculateTotalSales(transactions) {
    try {
        var totalTickets = 0;
        var totalPrice = 0;
        var eachTicketPrice = 0;
        if(transactions.length < 1)
            throw new Error("NOT_ENOUGH_TXNS");
        
        for (let index = 0; index < transactions.length; index++) {
            const eachTransaction = transactions[index];
            if(eachTransaction.actions[0].info.raffle_address === process.env.RAFFLE_ADDRESS)
            {
                console.log("TransactionScanned -", index)
                if(eachTicketPrice === 0)
                    eachTicketPrice = eachTransaction.actions[0].info.ticket_price;

                totalTickets = totalTickets + eachTransaction.actions[0].info.tickets;
                totalPrice = totalPrice + (eachTransaction.actions[0].info.tickets * eachTransaction.actions[0].info.ticket_price);
            }
        }
        return {
            total_tickets_sold: totalTickets,
            total_amount_sold: totalPrice,
            each_ticket_price: eachTicketPrice
        }

    } catch (error) {
        console.log(error.message);
        return {
            total_tickets_sold: 0,
            total_amount_sold: 0,
            each_ticket_price: 0
        }
    }
}

function countUniqueBuyers(transactions) {
    try {
        if(transactions.length < 1)
            throw new Error("NOT_ENOUGH_TXNS");

        var countBuyer = {};

        transactions.forEach(eachTxn => {
            const currentInfo = eachTxn.actions[0].info;
            if(countBuyer[currentInfo.buyer])
            {
                countBuyer[currentInfo.buyer] += currentInfo.tickets;
            }
            else
            {
                countBuyer[currentInfo.buyer] = currentInfo.tickets;
            }
        })
        
        return {
            buyers: countBuyer
        }
        
    } catch (error) {
        console.log(error.message);
        return {
            buyers: false
        }
    }
}

function getDifferenceISO(ISODateInitial, ISODateFinal) {
  var dateInitial = new Date(ISODateInitial);
  var dateFinal = new Date(ISODateFinal);

  return dateFinal.getHours() - dateInitial.getHours(); //change to day in production
}
