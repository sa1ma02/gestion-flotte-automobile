package com.autoflotte;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AutoflotteApplication {

	public static void main(String[] args) {
		
		System.out.println();
		System.out.println("                                  -=-=-=-=-=-=-=-=-=-=-=-=-=- Application is Starting -=-=-=-=-=-=-=-=-=-=-=-=-=-");
		SpringApplication.run(AutoflotteApplication.class, args);
		
		System.out.println();
		System.out.println("                                  -=-=-=-=-=-=-=-=-=-=-=-=-=- Application is Working Fine -=-=-=-=-=-=-=-=-=-=-=-=-=-");
	}

}
