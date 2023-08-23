import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MCcy extends BaseModel {
  public static table = 'x_currencies'
  @column({ isPrimary: true })
  public ccy_code: string
  @column()
  public ccy_type: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
