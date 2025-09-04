package com.handyhub.backend.payload.request;

import jakarta.validation.constraints.NotBlank;

public class ProblemStatusUpdateRequest {
    @NotBlank
    private String status;

    public ProblemStatusUpdateRequest() {}

    public ProblemStatusUpdateRequest(String status) {
        this.status = status;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
