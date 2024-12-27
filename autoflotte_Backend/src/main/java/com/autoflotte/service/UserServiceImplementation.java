package com.autoflotte.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.autoflotte.config.JwtTokenProvider;
import com.autoflotte.exception.OrderException;
import com.autoflotte.exception.UserException;
import com.autoflotte.modal.Order;
import com.autoflotte.modal.User;
import com.autoflotte.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {
	
	private UserRepository userRepository;
	private JwtTokenProvider jwtTokenProvider;
	
	public UserServiceImplementation(UserRepository userRepository,JwtTokenProvider jwtTokenProvider) {
		
		this.userRepository=userRepository;
		this.jwtTokenProvider=jwtTokenProvider;
		
	}

	@Override
	public User findUserById(Long userId) throws UserException {
		Optional<User> user=userRepository.findById(userId);
		
		if(user.isPresent()){
			return user.get();
		}
		throw new UserException("user not found with id "+userId);
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		System.out.println("user service");
		String email=jwtTokenProvider.getEmailFromJwtToken(jwt);
		
		System.out.println("email"+email);
		
		User user=userRepository.findByEmail(email);
		
		
		
		if(user==null) {
			throw new UserException("user not exist with email "+email);
		}
		System.out.println("email user"+user.getEmail());
		return user;
	}

	@Override
	public List<User> findAll(String jwt) throws UserException {
		
		return userRepository.findAll();
	}

	@Override
	public void deleteUser(Long userId) throws UserException {
		
		userRepository.deleteById(userId);
		
	}

}
