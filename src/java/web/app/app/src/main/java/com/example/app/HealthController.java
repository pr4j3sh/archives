package com.example.app;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HealthController {
  @GetMapping("/api/health")
  public String index() {
    return "server online";
  }
}
