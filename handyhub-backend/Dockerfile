# Use OpenJDK base image
FROM openjdk:17-jdk-slim

# Create app directory
WORKDIR /app

# Copy jar file into container
COPY target/*.jar app.jar

# Expose backend port
EXPOSE 8080

# Start Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
