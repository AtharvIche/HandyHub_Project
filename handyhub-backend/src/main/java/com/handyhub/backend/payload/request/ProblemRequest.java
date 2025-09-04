package com.handyhub.backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProblemRequest {
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

    private String status;

    public ProblemRequest() {}

    public ProblemRequest(String category, String description, String location, String phone, String status) {
        this.category = category;
        this.description = description;
        this.location = location;
        this.phone = phone;
        this.status = status;
    }

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
}
