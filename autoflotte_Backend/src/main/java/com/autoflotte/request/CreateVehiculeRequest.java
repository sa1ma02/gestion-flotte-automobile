package com.autoflotte.request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.autoflotte.modal.Category;
import com.autoflotte.modal.User;

// import jakarta.persistence.Column;


public class CreateVehiculeRequest {
    
    private String immatricule;
    private String categoryName;
    private String statut;
    private String modele;
    private int annee;
    private int kilometrage;
    private String typeCarburant;
    private int consommationCarb;
    private int puissanceMoteur;
    private String typeTransmission;
    private String fournisseur;
    private String imageUrl;
    private String accidents;
    private LocalDateTime createdAt;
    private LocalDate dateAssurance;
    private LocalDate dateMaintenance;
    private String assigne;
    // Add userId instead of User object
    // private User user;

    // Getters and setters

    public String getImmatricule() {
        return immatricule;
    }

    public void setImmatricule(String immatricule) {
        this.immatricule = immatricule;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String c) {
        this.categoryName = c;
    }

    public String getModele() {
        return modele;
    }

    public void setModele(String modele) {
        this.modele = modele;
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

    public String getTypeCarburant() {
        return typeCarburant;
    }

    public void setTypeCarburant(String typeCarburant) {
        this.typeCarburant = typeCarburant;
    }

    public int getConsommationCarb() {
        return consommationCarb;
    }

    public void setConsommationCarb(int consommationCarb) {
        this.consommationCarb = consommationCarb;
    }

    public int getPuissanceMoteur() {
        return puissanceMoteur;
    }

    public void setPuissanceMoteur(int puissanceMoteur) {
        this.puissanceMoteur = puissanceMoteur;
    }

    public String getTypeTransmission() {
        return typeTransmission;
    }

    public void setTypeTransmission(String typeTransmission) {
        this.typeTransmission = typeTransmission;
    }

    public String getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(String fournisseur) {
        this.fournisseur = fournisseur;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAccidents() {
        return accidents;
    }

    public void setAccidents(String accidents) {
        this.accidents = accidents;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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

    public String getAssigne() {
        return assigne;
    }

    public void setAssigne(String a) {
        this.assigne= a;
    }

	public String getStatut() {
		return statut;
	}

	public void setStatut(String statut) {
		this.statut = statut;
	}

	

	
}
