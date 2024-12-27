package com.autoflotte.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.autoflotte.exception.VehiculeException;
import com.autoflotte.modal.Vehicule;
import com.autoflotte.request.CreateVehiculeRequest;
import com.autoflotte.response.ApiResponse;
import com.autoflotte.service.VehiculeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/vehicules")
public class AdminVehiculeController {
	
	private VehiculeService vehiculeService;
	
	public AdminVehiculeController(VehiculeService vehiculeService) {
		this.vehiculeService = vehiculeService;
	}
	
	@PostMapping("/")
	public ResponseEntity<Vehicule> createVehiculeHandler(@RequestBody CreateVehiculeRequest req) throws VehiculeException{
		
		Vehicule createdVehicule = vehiculeService.createVehicule(req);
		
		return new ResponseEntity<Vehicule>(createdVehicule,HttpStatus.ACCEPTED);
		
	}
	
	@DeleteMapping("/{vehiculeId}/delete")
	public ResponseEntity<ApiResponse> deleteVehiculeHandler(@PathVariable Long vehiculeId) throws VehiculeException{
		
		System.out.println("delete vehicule controller .... ");
		String msg=vehiculeService.deleteVehicule(vehiculeId);
		System.out.println("delete vehicule controller .... msg "+msg);
		ApiResponse res=new ApiResponse(msg,true);
		
		return new ResponseEntity<ApiResponse>(res,HttpStatus.ACCEPTED);
		
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Vehicule>> findAllVehicule(){
		
		List<Vehicule> vehicules = vehiculeService.getAllVehicule();
		
		return new ResponseEntity<List<Vehicule>>(vehicules,HttpStatus.OK);
	}
	
	@PutMapping("/{vehiculeId}/update")
	public ResponseEntity<Vehicule> updateVehiculeHandler(@RequestBody Vehicule req,@PathVariable Long vehiculeId) throws VehiculeException{
		
		Vehicule updatedVehicule=vehiculeService.updateVehicule(vehiculeId, req);
		
		return new ResponseEntity<Vehicule>(updatedVehicule,HttpStatus.OK);
	}
	


}