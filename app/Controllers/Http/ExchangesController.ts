import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import MCcy from "App/Models/currency/MCcy";
import MCcyRate from "App/Models/currency/MCcyRate";
import CurrTradValidator from "App/Validators/CurrTradValidator";
import StoreCurrencyValidator from "App/Validators/StoreCurrencyValidator";
import StoreExRateValidator from "App/Validators/StoreExRateValidator";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class ExchangesController {
  /**
   *
   */
  public async indexCurrencies({ response }: HttpContextContract) {
    try {
      const result = await MCcy.query().where("stat", "<>", "D");
      return response.status(202).json(result);
    } catch (error) {
      console.log(error);
      response.badRequest(error);
    }
  }

  public async findRate({ request, response }: HttpContextContract) {
    //
    const reqshema = schema.create({
      ccy: schema.string(),
    });
    const payload = await request.validate(reqshema);
    try {
      const result = await MCcyRate.query().where("ccy", payload.ccy);
      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   */
  public async StoreCurrencies({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(StoreCurrencyValidator);
      await MCcy.create(payload);
      return response.status(201).json({ message: "COMPLETED" });
    } catch (error) {
      console.log(error);
      response.badRequest(error);
    }
  }
  /**
   *
   */
  public async StoreRate({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(StoreExRateValidator);
      await MCcyRate.createMany(payload.rate);
      return response.status(201).json({ message: "COMPLETED" });
    } catch (error) {
      console.log(error);
      response.badRequest(error);
    }
  }

  public async TxnTradCurrency({ request, response }: HttpContextContract) {
    //
    const payload = await request.validate(CurrTradValidator);
    let rate_type = payload.rate_type == "B" ? "buy_rate" : "sell_rate";
    const result_curr = await MCcyRate.query().whereIn("ccy", [
      payload.frm_ccy,
      payload.to_ccy,
    ]);
    console.log(
      (result_curr.find((t) => t.ccy == payload.frm_ccy)?.$attributes[
        rate_type
      ] /
        result_curr.find((t) => t.ccy == payload.to_ccy)?.$attributes[
          rate_type
        ]) *
        payload.amount
    );
  }

  public async SimpleTradCurrency({ request, response }: HttpContextContract) {
    //
    const payload = await request.validate(CurrTradValidator);
    let rate_type = payload.rate_type == "B" ? "buy_rate" : "sell_rate";
    const result_curr = await MCcyRate.query().whereIn("ccy", [
      payload.frm_ccy,
      payload.to_ccy,
    ]);
    let result =
      (result_curr.find((t) => t.ccy == payload.frm_ccy)?.$attributes[
        rate_type
      ] /
        result_curr.find((t) => t.ccy == payload.to_ccy)?.$attributes[
          rate_type
        ]) *
      payload.amount;
    let txn = [
      {
        ref_seq: 1,
        frm_ccy: payload.frm_ccy,
        to_ccy: payload.to_ccy,
        local_ccy: "LAK",
        rate_type,
        amount: payload.amount,
        to_amount: result,
      },
    ];
    return response.json({
      remark: `${payload.frm_ccy} To ${payload.to_ccy} @ ${payload.amount}/${result}`,
      txnDetail: txn,
    });
  }
}
