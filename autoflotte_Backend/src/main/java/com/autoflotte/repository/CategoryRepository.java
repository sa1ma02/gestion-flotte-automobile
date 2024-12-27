package com.autoflotte.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.autoflotte.modal.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	public Category findByName(String name);

	
}
