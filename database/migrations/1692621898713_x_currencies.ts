import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'x_currencies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('ccy_code',3).primary().unique()
      table.string('ccy_type',3).unique()
      table.enum('stat',['O','C','D']).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
