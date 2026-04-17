package com.example.backend.controller;

import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.*;
import com.example.backend.entity.Todo;
import com.example.backend.repository.TodoRepository;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoRepository repo;

    public TodoController(TodoRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Todo> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public Todo create(@Valid @RequestBody Todo todo) {
        return repo.save(todo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @Valid @RequestBody Todo newTodo) {
        Todo todo = repo.findById(id).orElseThrow();
        todo.setTitle(newTodo.getTitle());
        return repo.save(todo);
    }
}
