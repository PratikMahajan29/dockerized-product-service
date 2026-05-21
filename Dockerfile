# =========================
# Stage 1: Build Stage
# =========================
FROM maven:3.9.11-eclipse-temurin-21 AS builder

WORKDIR /app

# Copy Maven configuration
COPY pom.xml .

# Copy backend source code
COPY src ./src

# Copy frontend source code (required by frontend-maven-plugin)
COPY ui ./ui

# Build complete application (backend + frontend)
RUN mvn clean package -DskipTests


# =========================
# Stage 2: Runtime Stage
# =========================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy generated JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]