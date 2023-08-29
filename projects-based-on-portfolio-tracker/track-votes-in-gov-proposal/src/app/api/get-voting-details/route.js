import { NextResponse } from "next/server";
import axios from "axios";

const supportedNetworks = ['devnet','mainnet-beta'];

export const GET = async (req, res) => {
  try {
    const url = new URL(req.url);
    const proposal_address = url.searchParams.get("proposal");

     await getProposalTransactions(proposal_address,"mainnet-beta");

    return NextResponse.json({
        success: true
      });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        success: false, 
        message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
};

async function getProposalTransactions(address,network) {
    try {
        
        if(!address)
            throw new Error("EMPTY_ADDRESS");
        if(!supportedNetworks.includes(network))
            throw new Error("UNSUPPORTED_NETWORK");

        var proposalName = "";
        var allTransactions = [];
        var oldestTxnSignature = "";

        var isFetchComplete = false;

        while(isFetchComplete === false)
        {
            var paramsForRequest = {
                network: network,
                account: address,

            }
            if(oldestTxnSignature !== "")
                paramsForRequest = {
                    ...paramsForRequest,
                    before_tx_signature: oldestTxnSignature
                }
                console.log("calling API");
            try {
                const getTransactions = await axios({
                    url: "https://api.shyft.to/sol/v1/transaction/history",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": process.env.SHYFT_KEY ?? "---"
                    },
                    params: paramsForRequest
                });

                const transactions = getTransactions.json();
                console.log("Transactions received; ",transactions);
                if(transactions.success === false)
                    throw new Error("BAD_REQUEST");
                
                isFetchComplete = true;

                
                
            } catch (error) {
                console.warn(error.message);
                throw new Error("Some Axios error occured")
            }
            
        }
        
    } catch (error) {
        console.log(error);
    }
}
