package com.peterndta.ecommerce.service;

import com.peterndta.ecommerce.dto.Purchase;
import com.peterndta.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
