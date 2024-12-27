package com.autoflotte.service;

import java.util.List;
import java.time.LocalDateTime;
import java.time.LocalDate;
import com.autoflotte.exception.OrderException;
import com.autoflotte.modal.Order;
import com.autoflotte.modal.User;
import com.autoflotte.modal.Vehicule;

public interface OrderService {
	
	public Order createOrder(User user, LocalDate sd, LocalDate ed, Vehicule vehicule); 
	
	public Order findOrderById(Long orderId) throws OrderException;
	
	public List<Order> usersOrderHistory(Long userId);
	
	public Order placedOrder(Long orderId) throws OrderException;
	
	public Order confirmedOrder(Long orderId)throws OrderException;
	
	public Order rejectOrder(Long orderId) throws OrderException;
	
	
	public List<Order>getAllOrders();
	
	public void deleteOrder(Long orderId) throws OrderException;
	
}
