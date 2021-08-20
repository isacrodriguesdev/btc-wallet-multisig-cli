import fs from "fs"
import path from "path"

export class AddCopayersUseCase {

  constructor(

  ) { }

  public execute(filename: string = "wallets", ext: string = "json") {
    const rPath = path.resolve(filename + "." + ext)
    const rFile = fs.readFileSync(rPath, { encoding: "utf-8" })

    if (!rFile) {
      return console.log("File not exists use --createwallet")
    }

    const jFile = JSON.parse(rFile)
    const modObj = {
      ...jFile,
      copayers: [
        ...jFile.copayers,
        process.argv.slice(2)[1]
      ]
    }

    const modJson = JSON.stringify(modObj)
    fs.writeFileSync(rPath, modJson)

    console.log()
    console.log("Pass the keys in that order to the copayers")
    console.log(modObj.copayers)
    console.log()
    console.log()
  }
}