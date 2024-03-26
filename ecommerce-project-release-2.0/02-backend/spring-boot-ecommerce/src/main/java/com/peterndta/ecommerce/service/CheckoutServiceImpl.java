package com.peterndta.ecommerce.service;

import com.peterndta.ecommerce.dao.CustomerRepository;
import com.peterndta.ecommerce.dto.Purchase;
import com.peterndta.ecommerce.dto.PurchaseResponse;
import com.peterndta.ecommerce.entity.Customer;
import com.peterndta.ecommerce.entity.Order;
import com.peterndta.ecommerce.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // lấy order info từ dto
        Order order = purchase.getOrder();

        // tạo tracking number với uuid
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // điền vào order với orderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        // điền vào order với billingAddress và shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // điền vào customer với order tương ứng
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // lưu vào db
        customerRepository.save(customer);

        // trả về response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // generate uuid
        return UUID.randomUUID().toString();
    }
}
