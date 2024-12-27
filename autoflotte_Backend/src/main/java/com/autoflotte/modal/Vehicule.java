package com.autoflotte.modal;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Vehicule {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "immatricule")
    private String immatricule;

	@ManyToOne
    @JoinColumn(name = "categorie")
    private Category categorie;

	@Column(name = "statut")
    private String statut;

	@Column(name = "modèle")
    private String modele;

    @Column(name = "annee")
    private int annee;

	@Column(name = "kilometrage")
    private int kilometrage;

	@Column(name = "type_carburant")
    private String typeCarburant;

	@Column(name = "consommation_carburant")
    private int consommationCarb;

	@Column(name = "puissance_moteur")
    private int puissanceMoteur;

	@Column(name = "type_transmission")
    private String typeTransmission;

	@Column(name = "fournisseur")
    private String fournisseur;

    @Column(name = "image_url")
    private String imageUrl;

	@Column(name = "historique_accidents")
    private String accidents;

    private LocalDateTime createdAt;

	@Column(name = "date_assurance")
	private LocalDate dateAssurance;

	@Column(name = "date_maintenance")
	private LocalDate dateMaintenance;

	@Column(name = "assigne")
    private String assigne;





	@OneToMany(mappedBy = "vehicule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonBackReference // Manages serialization of orders
    private List<Order> orders = new ArrayList<>();

    
	public Vehicule() {
		
	}

	public Vehicule(Long id, String immatricule, Category c, int annee, String modele, String typeCarb,
			int kilometrage,  String statut, int consommation, int puissance, String imageUrl, LocalDateTime createdAt, String tt, String fournisseur, String assigne, LocalDate dateAssurance, LocalDate dateMaintenance, String accidents) {
		super();
		this.id = id;
		this.immatricule = immatricule ;
		this.categorie = c;
		this.annee = annee;
		this.modele = modele;
		this.typeCarburant= typeCarb;
		this.kilometrage = kilometrage;
		this.consommationCarb= consommation;
		this.puissanceMoteur= puissance;
		this.assigne= assigne;
		this.dateAssurance = dateAssurance;
		this.dateMaintenance = dateMaintenance;
		this.statut = statut;
		this.imageUrl = imageUrl;
		this.createdAt = createdAt;
		this.typeTransmission=tt;
		this.fournisseur=fournisseur;
		this.accidents=accidents;
	}

	public Vehicule(Long id, String immatricule, Category categorie, int annee, String modele, String typeCarburant,
                    int kilometrage, String statut, int consommationCarb, int puissanceMoteur, String imageUrl,
                    LocalDateTime createdAt, String typeTransmission, String fournisseur, 
                    LocalDate dateAssurance, LocalDate dateMaintenance, String accidents, List<Order> orders) {
        this.id = id;
        this.immatricule = immatricule;
        this.categorie = categorie;
        this.annee = annee;
        this.modele = modele;
        this.typeCarburant = typeCarburant;
        this.kilometrage = kilometrage;
        this.consommationCarb = consommationCarb;
        this.puissanceMoteur = puissanceMoteur;
        // this.users = users;
        this.dateAssurance = dateAssurance;
        this.dateMaintenance = dateMaintenance;
        this.statut = statut;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
        this.typeTransmission = typeTransmission;
        this.fournisseur = fournisseur;
        this.accidents = accidents;
        this.orders = orders;
    }

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}


	public String getImmatricule() {
		return immatricule;
	}

	public void setImmatricule(String immatricule) {
		this.immatricule = immatricule;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Category getCategorie() {
		return categorie;
	}

	public void setCategorie(Category c) {
		this.categorie = c;
	}



	public String getModele() {
		return modele;
	}

	public void setModele(String m) {
		this.modele = m;
	}


	public int getAnnee() {
		return annee;
	}

	public void setAnnee(int annee) {
		this.annee = annee;
	}


	public int getKilometrage() {
		return kilometrage;
	}

	public void setKilometrage(int kilometrage) {
		this.kilometrage = kilometrage;
	}



	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getTypeCarburant() {
		return typeCarburant;
	}

	public void setTypeCarburant(String t) {
		this.typeCarburant = t;
	}

	public int getPuissanceMoteur() {
		return puissanceMoteur;
	}

	public void setPuissanceMoteur(int p) {
		this.puissanceMoteur=p;
	}

	public int getConsommationCarb() {
		return consommationCarb;
	}

	public void setConsommationCarb(int c) {
		this.consommationCarb = c;
	}

	public String getTypeTransmission() {
		return typeTransmission;
	}

	public void setTypeTransmission(String tt) {
		this.typeTransmission = tt;
	}

	public String getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(String f) {
		this.fournisseur = f;
	}


	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}

	public LocalDate getDateAssurance() {
		return dateAssurance;
	}

	public void setDateAssurance(LocalDate dateAssurance) {
		this.dateAssurance = dateAssurance;
	}

	public LocalDate getDateMaintenance() {
		return dateMaintenance;
	}

	public void setDateMaintenance(LocalDate dateMaintenance) {
		this.dateMaintenance = dateMaintenance;
	}

	public String getAccidents() {
		return accidents;
	}

	public void setAccidents(String accidents) {
		this.accidents = accidents;
	}


	public String getAssigne() {
		return assigne;
	}

	public void setAssigne(String assigne) {
		this.assigne = assigne;
	}

	@Override
	public int hashCode() {
		return Objects.hash( categorie, statut,id, imageUrl,
				 annee, kilometrage, immatricule );
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vehicule other = (Vehicule) obj;
		return  
				Objects.equals(statut, other.statut) && Objects.equals(categorie, other.categorie)
				&&  Objects.equals(modele, other.modele)
				&& Objects.equals(id, other.id) && Objects.equals(imageUrl, other.imageUrl)
				 && annee == other.annee && kilometrage == other.kilometrage
				&& Objects.equals(immatricule, other.immatricule) 
				&&  Objects.equals(typeCarburant, other.typeCarburant)
				&&  Objects.equals(typeTransmission, other.typeTransmission)
			    &&  Objects.equals(fournisseur, other.fournisseur)
				&&  Objects.equals(assigne, other.assigne)
				&& consommationCarb == other.consommationCarb
				&& puissanceMoteur == other.puissanceMoteur
				&& Objects.equals(orders, other.orders);

	}

	

   
}