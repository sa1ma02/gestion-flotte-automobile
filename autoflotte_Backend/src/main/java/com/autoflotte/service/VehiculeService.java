package com.autoflotte.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.autoflotte.exception.VehiculeException;

import com.autoflotte.modal.Vehicule;
import com.autoflotte.request.CreateVehiculeRequest;


public interface VehiculeService {
	
	// only for admin
	public Vehicule createVehicule(CreateVehiculeRequest req) throws VehiculeException;
	
	public String deleteVehicule(Long vehiculeId) throws VehiculeException;
	
	public Vehicule updateVehicule(Long vehiculeId,Vehicule vehicule)throws VehiculeException;
	
	public List<Vehicule> getAllVehicule();
	
	// for user and admin both
	public Vehicule findVehiculeById(Long id) throws VehiculeException;
	
	public List<Vehicule> findVehiculeByCategory(String category);
	
	public List<Vehicule> searchVehicule(String query);
	
	
	public Page<Vehicule> getAllVehicule(String categoryName, String stock, int pageNumber, int pageSize);
	
	
	
	

}
