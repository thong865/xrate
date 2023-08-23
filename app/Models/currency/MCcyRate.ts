import { DateTime } from 'luxon'
import { BaseModel, afterSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class MCcyRate extends BaseModel {
  public static table = 'x_rate_masters'
  @column({ isPrimary: true })
  public id: number
  @column()
  public ccy: string
  @column()
  public buy_rate: number
  @column()
  public sell_rate: number
  @column()
  public rate_date: DateTime
  @column()
  public round: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @afterSave()
  public static  async storeRound(urate: MCcyRate){
    const round = await MCcyRate.query().max('round as number').where('ccy',urate.ccy).first()
    console.log(urate.ccy)
    console.log(round?.$extras.number)
  }
}
