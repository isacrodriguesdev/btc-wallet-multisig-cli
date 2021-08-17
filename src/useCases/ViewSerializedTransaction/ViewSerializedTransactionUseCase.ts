import bitcore from "bitcore-lib"

export class ViewSerializedTransactionUseCase {

  public execute(script: any) {
    const argv = process.argv.slice(3)[0]
    const raw = Buffer.from(argv, "hex").toString("utf-8")
    const view = JSON.parse(raw)
    const uniBtc = 100000000

    for (let i = 0; i < view.toAddress.length; i++) {
      console.log("\n:::: Sending info ::::","\n")
      console.log(view.toAddress[i].address, view.toAddress[i].value + " (sats) or " + view.toAddress[i].value / uniBtc, "(btc)")
      console.log()
    }

    console.log("Total (btc):", view.total / uniBtc)
    console.log("Fee (sats):", view.fee, "\n")
    console.log("::::::::::::::::::::::::::", "\n")
    console.log("to sign this transaction use\n\n>" ,"node index.js --signrawtransaction (insert raw transaction)", "\n")

  }
}