import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts} from '../data/products.js';
import {populateCartItems} from '../data/cart.js';

loadProducts(() => {
  populateCartItems()
  renderOrderSummary()
  renderPaymentSummary();
});

