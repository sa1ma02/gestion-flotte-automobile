package com.autoflotte.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.autoflotte.modal.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("SELECT o FROM Order o WHERE o.user.id = :userId AND (o.orderStatus = ENATTENTE  OR o.orderStatus = APPROUVEE OR o.orderStatus = REJETEE)")
	public List<Order> getUsersOrders(@Param("userId") Long userId);

	@Query("SELECT o FROM Order o JOIN FETCH o.vehicule WHERE o.id = :orderId")
    Order findByIdWithVehicule(@Param("orderId") Long orderId);
}
