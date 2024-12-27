package com.autoflotte.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoflotte.exception.OrderException;
import com.autoflotte.exception.UserException;
import com.autoflotte.modal.User;
import com.autoflotte.response.ApiResponse;
import com.autoflotte.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	private UserService userService;
	
	public UserController(UserService userService) {
		this.userService=userService;
	}
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String jwt) throws UserException{

		System.out.println("/api/users/profile");
		User user=userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
	}

	@GetMapping("/all")
	public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String jwt) throws UserException {
    List<User> users = userService.findAll(jwt);
	System.out.println("Retrieved users: " + users);
    return new ResponseEntity<>(users, HttpStatus.OK);
}

@DeleteMapping("/{userId}/delete")
	public ResponseEntity<ApiResponse> deleteUserHandler(@PathVariable Long userId, @RequestHeader("Authorization") String jwt) throws UserException{
		userService.deleteUser(userId);
		ApiResponse res=new ApiResponse("User Deleted Successfully",true);
		System.out.println("delete method working....");
		return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
	}

}