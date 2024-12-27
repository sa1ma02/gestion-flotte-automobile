package com.autoflotte.service;

import java.util.List;

import com.autoflotte.exception.OrderException;
import com.autoflotte.exception.UserException;
import com.autoflotte.modal.User;

public interface UserService {
	
	public User findUserById(Long userId) throws UserException;
	
	public User findUserProfileByJwt(String jwt) throws UserException;
	
	public List<User> findAll(String jwt) throws UserException;
	
	public void deleteUser(Long userId) throws UserException;

}
