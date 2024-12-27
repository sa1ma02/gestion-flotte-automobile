package com.autoflotte.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.autoflotte.exception.VehiculeException;
import com.autoflotte.modal.Vehicule;
import com.autoflotte.service.VehiculeService;


@RestController
@RequestMapping("/api")
public class UserVehiculeController {
	
	private VehiculeService vehiculeService;
	
	public UserVehiculeController(VehiculeService vehiculeService) {
		this.vehiculeService=vehiculeService;
	}
	
	
	@GetMapping("/vehicules")
public ResponseEntity<Page<Vehicule>> findVehiculeByCategoryHandler(
    @RequestParam(value = "categoryName", required = false, defaultValue = "") String categoryName,
    @RequestParam(value = "statut", required = false, defaultValue = "") String stock,
    @RequestParam(value = "pageNumber", defaultValue = "0") Integer pageNumber,
    @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize) {

    Page<Vehicule> res = vehiculeService.getAllVehicule(categoryName, stock, pageNumber, pageSize);

    return new ResponseEntity<>(res, HttpStatus.OK);
}
	

	
	@GetMapping("/vehicules/id/{vehiculeId}")
	public ResponseEntity<Vehicule> findVehiculeByIdHandler(@PathVariable Long vehiculeId) throws VehiculeException{
		
		Vehicule vehicule=vehiculeService.findVehiculeById(vehiculeId);
		
		return new ResponseEntity<Vehicule>(vehicule,HttpStatus.ACCEPTED);
	}

	@GetMapping("/vehicules/search")
	public ResponseEntity<List<Vehicule>> searchVehiculeHandler(@RequestParam String q){
		
		List<Vehicule> vehicules=vehiculeService.searchVehicule(q);
		
		return new ResponseEntity<List<Vehicule>>(vehicules,HttpStatus.OK);
		
	}
}