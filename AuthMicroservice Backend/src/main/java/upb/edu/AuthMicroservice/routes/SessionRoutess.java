package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import upb.edu.AuthMicroservice.controllers.SessionController;

import static org.springframework.web.servlet.function.RouterFunctions.route;


@Configuration
public class SessionRoutess {

    private final SessionController sessionController;

    public SessionRoutess(SessionController sessionController) {
        this.sessionController = sessionController;
    }
    @Bean 
    public RouterFunction<ServerResponse> sessionRouterFunctionInternal(SessionController controller){
        return route()
                .POST("/generate-session", sessionController::generateSession)
                .POST("/refresh-token", sessionController::refreshToken)
                .build();
    }
}
