package com.example.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@RestController
public class BootApplication {

  public static void main(String[] args) {
    SpringApplication.run(BootApplication.class, args);
  }

  @GetMapping("/api/health")
  public String health() {
    return "server online";
  }

}
