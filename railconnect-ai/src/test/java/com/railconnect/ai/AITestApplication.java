package com.railconnect.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.railconnect")
@EntityScan(basePackages = "com.railconnect")
@EnableJpaRepositories(basePackages = "com.railconnect")
public class AITestApplication {
    public static void main(String[] args) {
        SpringApplication.run(AITestApplication.class, args);
    }
}
