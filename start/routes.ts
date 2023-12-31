/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/api/currencies','ExchangesController.indexCurrencies')
Route.post('/api/currencies','ExchangesController.StoreCurrencies')

// exchange rate
Route.get('/api/exchangerate/rate','ExchangesController.findRate')

Route.post('/api/exchangerate','ExchangesController.StoreRate')
Route.post('/api/exchangerate/ftrad','ExchangesController.TxnTradCurrency')
Route.post('/api/exchangerate/ftrad_simple','ExchangesController.SimpleTradCurrency')
