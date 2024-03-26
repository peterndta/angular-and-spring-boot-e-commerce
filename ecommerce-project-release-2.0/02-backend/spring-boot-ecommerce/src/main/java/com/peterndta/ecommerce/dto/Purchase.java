package com.peterndta.ecommerce.dto;

import com.peterndta.ecommerce.entity.Address;
import com.peterndta.ecommerce.entity.Customer;
import com.peterndta.ecommerce.entity.Order;
import com.peterndta.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
