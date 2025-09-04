package com.handyhub.backend.security.services;

import com.handyhub.backend.models.Problem;
import com.handyhub.backend.models.User;
import com.handyhub.backend.payload.request.ProblemRequest;
import com.handyhub.backend.payload.request.ProblemStatusUpdateRequest;
import com.handyhub.backend.repository.ProblemRepository;
import com.handyhub.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private UserRepository userRepository; // To fetch user for problem creation/association

    public Problem createProblem(ProblemRequest problemRequest, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + userEmail));

        Problem problem = new Problem(
                problemRequest.getCategory(),
                problemRequest.getDescription(),
                problemRequest.getLocation(),
                problemRequest.getPhone(),
                user
        );
        return problemRepository.save(problem);
    }

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public List<Problem> getProblemsByUserId(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + userEmail));
        return problemRepository.findByUserId(user.getId());
    }

    public Problem updateProblem(Long id, ProblemRequest problemRequest, String userEmail) {
        Problem existingProblem = problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found with id: " + id));

        // Ensure only the owner can update their problem
        if (!existingProblem.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update this problem.");
        }

        existingProblem.setCategory(problemRequest.getCategory());
        existingProblem.setDescription(problemRequest.getDescription());
        existingProblem.setLocation(problemRequest.getLocation());
        existingProblem.setPhone(problemRequest.getPhone());
        existingProblem.setStatus(problemRequest.getStatus()); // Allow status update here too if needed

        return problemRepository.save(existingProblem);
    }

    public Problem updateProblemStatus(Long id, ProblemStatusUpdateRequest statusUpdateRequest, String userEmail) {
        Problem existingProblem = problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found with id: " + id));

        // Ensure only the owner can update their problem's status
        if (!existingProblem.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to update the status of this problem.");
        }

        existingProblem.setStatus(statusUpdateRequest.getStatus());
        return problemRepository.save(existingProblem);
    }


    public void deleteProblem(Long id, String userEmail) {
        Problem existingProblem = problemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Problem not found with id: " + id));

        // Ensure only the owner can delete their problem
        if (!existingProblem.getUser().getEmail().equals(userEmail)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this problem.");
        }
        problemRepository.delete(existingProblem);
    }
}