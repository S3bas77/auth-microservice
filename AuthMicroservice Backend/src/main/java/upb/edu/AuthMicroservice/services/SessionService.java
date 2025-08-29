package upb.edu.AuthMicroservice.services;

import java.util.Optional;
import java.util.UUID;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upb.edu.AuthMicroservice.interactors.RefreshTokenInteractor;
import upb.edu.AuthMicroservice.interactors.SessionInteractor;

import upb.edu.AuthMicroservice.exceptions.InvalidRefreshTokenException;
import upb.edu.AuthMicroservice.exceptions.InvalidSessionException;

import upb.edu.AuthMicroservice.models.Session;
import upb.edu.AuthMicroservice.repositories.SessionRepository;
//import upb.edu.AuthMicroservice.repositories.UserRepository;


@Service
public class SessionService {

    public static class SessionCreationResult {
        private final UUID sessionId;
        private final UUID accessToken;
        private final UUID refreshToken;

        public SessionCreationResult(UUID sessionId, UUID accessToken, UUID refreshToken) {
            this.sessionId = sessionId;
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

        public UUID getSessionId() { return sessionId; }
        public UUID getAccessToken() { return accessToken; }
        public UUID getRefreshToken() { return refreshToken; }
    }

    @Autowired
    private SessionInteractor sessionInteractor;

    @Autowired
    private RefreshTokenInteractor refreshTokenInteractor;

    @Autowired
    private SessionRepository sessionRepository;

    public SessionCreationResult generateSession(int userId) {
        UUID sessionId = sessionInteractor.execute(userId); 
        Optional<Session> opt = sessionRepository.findById(sessionId);
        if (opt.isEmpty()) {
            throw new IllegalStateException("No se pudo recuperar la sesión recién creada");
        }
        Session s = opt.get();
        return new SessionCreationResult(s.getId(), s.getAccessToken(), s.getRefreshToken());
    }

    public void invalidateSession(UUID sessionId) {
        Optional<Session> opt = sessionRepository.findById(sessionId);
        if (opt.isEmpty()) {
            throw new InvalidSessionException("Sesión no encontrada");
        }
        Session s = opt.get();
        s.setIsValid(false);
        sessionRepository.save(s);
    }

    public String refreshAccessToken(String refreshTokenStr) {
        UUID rt;
        try {
            rt = UUID.fromString(refreshTokenStr);
        } catch (IllegalArgumentException e) {
            throw new InvalidRefreshTokenException("Refresh token inválido");
        }

        try {
            UUID newAccess = refreshTokenInteractor.execute(rt, 15);
            if (newAccess == null) {
                throw new InvalidRefreshTokenException("Refresh token inválido o expirado");
            }
            return newAccess.toString();
        } catch (IllegalStateException ex) {
            if ("SESSION_INVALID".equals(ex.getMessage())) {
                throw new InvalidSessionException("La sesión asociada no es válida");
            }
            throw ex;
        }
    }

    public boolean isAccessValid(UUID sessionId) {
        return sessionRepository.findById(sessionId)
                .filter(Session::isValid)
                .filter(s -> s.getExpiresAt() != null && s.getExpiresAt().isAfter(LocalDateTime.now()))
                .isPresent();
    }
    public java.util.Optional<upb.edu.AuthMicroservice.models.Session> getSessionById(java.util.UUID sessionId) {
    return sessionRepository.findById(sessionId);
    }
}