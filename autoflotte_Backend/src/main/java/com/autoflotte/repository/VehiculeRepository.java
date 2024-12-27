package com.autoflotte.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.autoflotte.modal.Vehicule;
import com.autoflotte.modal.Category;


public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

	@Query("SELECT v From Vehicule v Where LOWER(v.categorie.name)=:categorie")
	public List<Vehicule> findByCategory(@Param("categorie") String categorie);
	
	@Query("SELECT v From Vehicule v where LOWER(v.categorie.name) Like %:query% OR LOWER(v.immatricule)   LIKE %:query%")
	public List<Vehicule> searchVehicule(@Param("query")String query);
	

	Page<Vehicule> findByCategorieAndStatut(Category category, String statut, Pageable pageable);


	Page<Vehicule> findByStatut(String statut, Pageable pageable);
	
	Page<Vehicule> findByCategorie(Category category, Pageable pageable);
	
	@Query("SELECT p FROM Vehicule p " + "WHERE (p.categorie.name = :categorie OR :categorie = '')  "   )
	List<Vehicule> filterProducts( @Param("categorie") String categorie);
}
