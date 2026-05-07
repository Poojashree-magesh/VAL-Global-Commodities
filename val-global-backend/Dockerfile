FROM openjdk:17-jre-slim

WORKDIR /app

COPY target/val-global-backend-1.0.0.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]