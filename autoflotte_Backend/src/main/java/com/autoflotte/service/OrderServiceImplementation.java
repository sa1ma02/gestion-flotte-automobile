package com.autoflotte.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.stereotype.Service;
import com.autoflotte.exception.OrderException;
import com.autoflotte.modal.Order;
import com.autoflotte.modal.User;
import com.autoflotte.repository.OrderRepository;
import com.autoflotte.repository.UserRepository;
import com.autoflotte.repository.VehiculeRepository;
import com.autoflotte.user.domain.OrderStatus;
import com.autoflotte.modal.Vehicule;


@Service
public class OrderServiceImplementation implements OrderService {
	
	private OrderRepository orderRepository;
	private UserRepository userRepository;
	private VehiculeRepository vehiculeRepository;

	
	public OrderServiceImplementation(OrderRepository orderRepository, UserRepository userRepository, VehiculeRepository vehiculeRepository) {
		this.orderRepository=orderRepository;
		this.userRepository=userRepository;
		this.vehiculeRepository=vehiculeRepository;
	
	}

	@Override
    public Order createOrder(User user, LocalDate startDate, LocalDate endDate, Vehicule vehicule) {
        Order createdOrder = new Order();
        createdOrder.setUser(user);
        createdOrder.setStartDate(startDate);
        createdOrder.setEndDate(endDate);
        createdOrder.setOrderStatus(OrderStatus.ENATTENTE);
        createdOrder.setCreatedAt(LocalDateTime.now());
        createdOrder.setVehicule(vehicule);
		createdOrder.setOrderStatus(OrderStatus.ENATTENTE);
        return orderRepository.save(createdOrder);
    }


	@Override
	public Order placedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.ENATTENTE);
		
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.APPROUVEE);
		
		
		return orderRepository.save(order);
	}

	@Override
	public Order rejectOrder(Long orderId) throws OrderException {
		Order order=findOrderById(orderId);
		order.setOrderStatus(OrderStatus.REJETEE);
		return orderRepository.save(order);
	}

	



	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> opt=orderRepository.findById(orderId);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new OrderException("order not exist with id "+orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		List<Order> orders=orderRepository.getUsersOrders(userId);
		return orders;
	}

	@Override
	public List<Order> getAllOrders() {
		
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order =findOrderById(orderId);
		
		orderRepository.deleteById(orderId);
		
	}

}
