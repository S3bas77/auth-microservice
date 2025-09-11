package upb.edu.AuthMicroservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upb.edu.AuthMicroservice.interactors.UserInteractor;
import upb.edu.AuthMicroservice.models.User;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserInteractor userInteractor;
    private final SessionService sessionService;

    @Autowired
    public UserService(UserInteractor userInteractor, SessionService sessionService) {
        this.userInteractor = userInteractor;
        this.sessionService = sessionService;
    }

    public ResponseEntity<Object> login(String email, String password) {
        Optional<User> userOpt = userInteractor.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("code", 401, "msg", "Unauthorized"));
        }

        int userId = userOpt.get().getId();
        SessionService.SessionCreationResult sessionResult = sessionService.generateSession(userId);

        return ResponseEntity.status(201).body(Map.of(
                "code", 201,
                "msg", "Sesión creada exitosamente",
                "session_id", sessionResult.getSessionId().toString(),
                "access_token", sessionResult.getAccessToken().toString(),
                "refresh_token", sessionResult.getRefreshToken().toString()
        ));
    }

    public ResponseEntity<Object> changePassword(String email, String oldPassword, String newPassword) {
        boolean success = userInteractor.changePassword(email, oldPassword, newPassword);

        if (success) {
            return ResponseEntity.ok(Map.of("code", 200, "msg", "Ok"));
        } else {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("code", 401, "msg", "Datos incorrectos"));
        }
    }

    public org.springframework.http.ResponseEntity<Object> createUser(upb.edu.AuthMicroservice.models.User user) {
      Object result = userInteractor.createUser(user); 

      boolean created;
      if (result instanceof Boolean b) {
          created = b;
      } else if (result instanceof upb.edu.AuthMicroservice.models.User u) {
          created = (u != null) && (u.getId() != 0);
      } else if (result instanceof java.util.Optional<?> opt) {
          created = ((java.util.Optional<?>) opt).isPresent();
      } else {
          created = result != null;
      }

      if (created) {
          return org.springframework.http.ResponseEntity.ok(
                  java.util.Map.of("code", 200, "msg", "Ok")
          );
      } else {
          return org.springframework.http.ResponseEntity.status(400).body(
                  java.util.Map.of("code", 400, "msg", "Bad Request")
          );
    }
 
    public ResponseEntity<Object> validateEmail(String email) {
        Optional<User> userOpt = userInteractor.findByEmail(email);
        
        if (userOpt.isPresent()) {
            return ResponseEntity.ok(Map.of(
                "code", 200,
                "msg", "Email verified"
            ));
        } else {
            return ResponseEntity
                .status(404)
                .body(Map.of(
                    "code", 404,
                    "msg", "Email not found"
                ));
        }
    }
}