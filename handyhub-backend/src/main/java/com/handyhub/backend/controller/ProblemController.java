package com.handyhub.backend.controller;

import com.handyhub.backend.entity.Problem;
import com.handyhub.backend.service.ProblemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    // POST: Create a new problem
    @PostMapping
    public ResponseEntity<Problem> createProblem(@RequestBody Problem problem) {
        Problem createdProblem = problemService.createProblem(problem);
        return new ResponseEntity<>(createdProblem, HttpStatus.CREATED);
    }

    // GET: Get all problems
    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();
        return new ResponseEntity<>(problems, HttpStatus.OK);
    }

    // GET: Get a single problem by ID
    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long id) {
        Optional<Problem> problem = problemService.getProblemById(id);
        return problem.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // PUT: Update an existing problem
    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable Long id, @RequestBody Problem problemDetails) {
        try {
            Problem updatedProblem = problemService.updateFullProblem(id, problemDetails);
            return new ResponseEntity<>(updatedProblem, HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage() != null && e.getMessage().contains("Problem not found")) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            System.err.println("Error updating problem: " + e.getMessage());
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // DELETE: Delete a problem
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        try {
            problemService.deleteProblem(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // GET: Get problems for the current user
    @GetMapping("/my")
    public ResponseEntity<List<Problem>> getMyProblems() {
        List<Problem> myProblems = problemService.getAllProblems();
        return new ResponseEntity<>(myProblems, HttpStatus.OK);
    }
}
