package com.handyhub.backend.controllers;

import com.handyhub.backend.models.Problem;
import com.handyhub.backend.payload.request.ProblemRequest;
import com.handyhub.backend.payload.request.ProblemStatusUpdateRequest;
import com.handyhub.backend.security.services.ProblemService;
import com.handyhub.backend.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getEmail();
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()") // Only authenticated users can post problems
    public ResponseEntity<Problem> createProblem(@Valid @RequestBody ProblemRequest problemRequest) {
        Problem newProblem = problemService.createProblem(problemRequest, getCurrentUserEmail());
        return ResponseEntity.ok(newProblem);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()") // Only authenticated users can view all problems
    public ResponseEntity<List<Problem>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();
        return ResponseEntity.ok(problems);
    }

    @GetMapping("/my")
    @PreAuthorize("isAuthenticated()") // Only authenticated users can view their problems
    public ResponseEntity<List<Problem>> getMyProblems() {
        List<Problem> problems = problemService.getProblemsByUserId(getCurrentUserEmail());
        return ResponseEntity.ok(problems);
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()") // Only authenticated users can update their problems
    public ResponseEntity<Problem> updateProblem(@PathVariable Long id, @Valid @RequestBody ProblemRequest problemRequest) {
        Problem updatedProblem = problemService.updateProblem(id, problemRequest, getCurrentUserEmail());
        return ResponseEntity.ok(updatedProblem);
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("isAuthenticated()") // Only authenticated users can update their problem status
    public ResponseEntity<Problem> updateProblemStatus(@PathVariable Long id, @Valid @RequestBody ProblemStatusUpdateRequest statusUpdateRequest) {
        Problem updatedProblem = problemService.updateProblemStatus(id, statusUpdateRequest, getCurrentUserEmail());
        return ResponseEntity.ok(updatedProblem);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()") // Only authenticated users can delete their problems
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id, getCurrentUserEmail());
        return ResponseEntity.noContent().build();
    }
}