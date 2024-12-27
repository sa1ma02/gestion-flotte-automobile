package com.autoflotte.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoflotte.exception.OrderException;
import com.autoflotte.exception.UserException;

import com.autoflotte.modal.Order;
import com.autoflotte.modal.User;
import com.autoflotte.service.OrderService;
import com.autoflotte.service.UserService;
import java.time.LocalDateTime;
import java.time.LocalDate;
import com.autoflotte.modal.Vehicule;
import com.autoflotte.repository.VehiculeRepository;
import com.autoflotte.request.CreateOrderRequest;


@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private OrderService orderService;
	private UserService userService;
	private final VehiculeRepository vehiculeRepository;
	
	
    public OrderController(OrderService orderService, UserService userService, VehiculeRepository vehiculeRepository) {
        this.orderService = orderService;
        this.userService = userService;
        this.vehiculeRepository = vehiculeRepository;
    }
	
	@PostMapping("/")
    public ResponseEntity<Long> createOrderHandler(@RequestBody CreateOrderRequest createOrderRequest,
            @RequestHeader("Authorization") String jwt) throws UserException {

        User user = userService.findUserProfileByJwt(jwt);
        LocalDate startDate = createOrderRequest.getStartDate();
        LocalDate endDate = createOrderRequest.getEndDate();
        Long vehiculeId = createOrderRequest.getVehiculeId();
        
        // Fetch the vehicle based on ID
        Vehicule vehicule = vehiculeRepository.findById(vehiculeId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found with id " + vehiculeId));
        
        Order order = orderService.createOrder(user, startDate, endDate, vehicule);
        // In your order creation API endpoint:
		return ResponseEntity.ok(order.getId());

    }
	
	@GetMapping("/user")
	public ResponseEntity< List<Order>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		List<Order> orders=orderService.usersOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity< Order> findOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		
		User user=userService.findUserProfileByJwt(jwt);
		Order orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}

}