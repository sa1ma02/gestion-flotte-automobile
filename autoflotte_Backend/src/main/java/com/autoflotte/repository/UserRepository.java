package com.autoflotte.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.autoflotte.modal.User;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);

} 
