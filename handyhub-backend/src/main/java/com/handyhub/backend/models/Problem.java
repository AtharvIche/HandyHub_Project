package com.handyhub.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore; // <-- ADD THIS IMPORT
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Entity
@Table(name = "problems")
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String category;

    @NotBlank
    @Size(max = 1000)
    private String description;

    @NotBlank
    @Size(max = 255)
    private String location;

    @NotBlank
    @Size(max = 20)
    private String phone;

    private String status = "Pending";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime datePosted;

    @PrePersist
    protected void onCreate() {
        datePosted = LocalDateTime.now();
    }

    public Problem() {}

    public Problem(String category, String description, String location, String phone, User user) {
        this.category = category;
        this.description = description;
        this.location = location;
        this.phone = phone;
        this.user = user;
        this.status = "Pending";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    @JsonIgnore // <-- ADD THIS ANNOTATION
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public LocalDateTime getDatePosted() { return datePosted; }
    public void setDatePosted(LocalDateTime datePosted) { this.datePosted = datePosted; }
}