import fs from "fs"
import path from "path"

interface IGetWalletsUseCase {
  profile: {
    privatekey: string
  },
  rings: string[]
}

export class GetWalletsUseCase {

  public execute(filename: string = "wallets", extension = "json"): IGetWalletsUseCase {
    const dataRead = fs.readFileSync(path.resolve(`${filename}.${extension}`), "utf-8")
    return JSON.parse(dataRead)
  }
}