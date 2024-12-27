package com.autoflotte.service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.autoflotte.exception.UserException;
import com.autoflotte.exception.VehiculeException;
import com.autoflotte.modal.Category;
import com.autoflotte.modal.User;
import com.autoflotte.modal.Vehicule;
import com.autoflotte.repository.CategoryRepository;
import com.autoflotte.repository.VehiculeRepository;
import com.autoflotte.request.CreateVehiculeRequest;

@Service
public class VehiculeServiceImplementation implements VehiculeService {


	@Override
	public Page<Vehicule> getAllVehicule(String categoryName, String statut, int pageNumber, int pageSize) {
		Pageable pageable = PageRequest.of(pageNumber, pageSize);
	
		if (categoryName != null && !categoryName.isEmpty()) {
			// Trouver la catégorie par son nom
			Category category = categoryRepository.findByName(categoryName);
			if (category != null) {
				if (statut != null && !statut.isEmpty()) {
					// Filtrer les véhicules par catégorie et statut
					return vehiculeRepository.findByCategorieAndStatut(category, statut, pageable);
				} else {
					// Filtrer uniquement par catégorie
					return vehiculeRepository.findByCategorie(category, pageable);
				}
			} else {
				// Retourner une page vide si la catégorie n'existe pas
				return Page.empty(pageable);
			}
		} else {
			if (statut != null && !statut.isEmpty()) {
				// Filtrer uniquement par statut si aucune catégorie n'est spécifiée
				return vehiculeRepository.findByStatut(statut, pageable);
			} else {
				// Retourner une page vide si aucun filtre n'est spécifié
				return Page.empty(pageable);
			}
		}
	}

	
	private VehiculeRepository vehiculeRepository;
	private UserService userService;
	private CategoryRepository categoryRepository;
	
	public VehiculeServiceImplementation(VehiculeRepository vehiculeRepository,UserService userService, CategoryRepository categoryRepository) {
		this.vehiculeRepository=vehiculeRepository;
		this.userService=userService;
		this.categoryRepository=categoryRepository;
	}
	

	@Override
	public Vehicule createVehicule(CreateVehiculeRequest req) {
		
		User user;
		Category category = categoryRepository.findByName(req.getCategoryName());
		if (category == null) {
			throw new RuntimeException("Category not found: " + req.getCategoryName());
		}
    // try {
    //     user = userService.findUserById(req.getUserId());
		
    // } catch (UserException e) {
    //     // Handle the exception or rethrow it as a different exception
    //     throw new RuntimeException("User not found: " + req.getUserId(), e);
    // }
	
		Vehicule vehicule=new Vehicule();
		vehicule.setImageUrl(req.getImmatricule());
		vehicule.setCategorie(category);
		vehicule.setStatut(req.getStatut());
		vehicule.setModele(req.getModele());
		vehicule.setAnnee(req.getAnnee());
		vehicule.setImageUrl(req.getImageUrl());
		vehicule.setImmatricule(req.getImmatricule());
		vehicule.setKilometrage(req.getKilometrage());
		vehicule.setTypeCarburant(req.getTypeCarburant());
		vehicule.setConsommationCarb(req.getConsommationCarb());
		vehicule.setPuissanceMoteur(req.getPuissanceMoteur());
		vehicule.setTypeTransmission(req.getTypeTransmission());
		vehicule.setFournisseur(req.getFournisseur());
		vehicule.setAccidents(req.getAccidents());
		vehicule.setDateAssurance(req.getDateAssurance());
		vehicule.setDateMaintenance(req.getDateMaintenance());
		vehicule.setCreatedAt(LocalDateTime.now());
		vehicule.setAssigne(req.getAssigne());
		
		Vehicule savedVehicule= vehiculeRepository.save(vehicule);
		
		System.out.println("vehicules - "+vehicule);
		
		return savedVehicule;
	}

	@Override
	public String deleteVehicule(Long vehiculeId) throws VehiculeException {
		
		Vehicule vehicule=findVehiculeById(vehiculeId);
		
		System.out.println("delete vehicule "+vehicule.getId()+" - "+vehiculeId);
		// product.getSizes().clear();

		vehiculeRepository.delete(vehicule);
		
		return "Vehicule deleted Successfully";
	}

	
	@Override
	public List<Vehicule> getAllVehicule() {
		return vehiculeRepository.findAll();
	}

	@Override
	public Vehicule findVehiculeById(Long id) throws VehiculeException {
		Optional<Vehicule> opt=vehiculeRepository.findById(id);
		
		if(opt.isPresent()) {
			return opt.get();
		}
		throw new VehiculeException("vehicule not found with id "+id);
	}

	@Override
	public List<Vehicule> findVehiculeByCategory(String category) {
		
		System.out.println("category --- "+category);
		
		List<Vehicule> vehicules = vehiculeRepository.findByCategory(category);
		
		return vehicules;
	}

	
	@Override
	public List<Vehicule> searchVehicule(String query) {
		List<Vehicule> vehicules=vehiculeRepository.searchVehicule(query);
		return vehicules;
	}

    @Override
    public Vehicule updateVehicule(Long vehiculeId, Vehicule vehicule) throws VehiculeException {
        throw new UnsupportedOperationException("Not supported yet.");
    }



   


	

}
