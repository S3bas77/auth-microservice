package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import upb.edu.AuthMicroservice.controllers.RoleController;
import upb.edu.AuthMicroservice.controllers.SessionController;
import upb.edu.AuthMicroservice.controllers.UserController;

import static org.springframework.web.servlet.function.RouterFunctions.route;


@Configuration
public class SessionRoutes {

    private final UserController userController;
    private final SessionController sessionController;

    public SessionRoutes(UserController userController, SessionController sessionController) {
        this.userController = userController;
        this.sessionController = sessionController;
    }

    @Bean
    public RouterFunction<ServerResponse> MainrouterFunction(RoleController roleController) {
        return route()
                .path("/api", builder -> builder.add(RoleRoutes.roleRouter(roleController)))
                .build();
    }
    @Bean
    public RouterFunction<ServerResponse> userRoutesFunction(UserController controller) {
        return route()
                .path("/auth", builder -> builder.add(UserRoutes.userRouter(controller)))
                .build();
    }
    @Bean 
    public RouterFunction<ServerResponse> sessionRouterFunctionInternal(SessionController controller){
        return route()
                .POST("/generate-session", sessionController::generateSession)
                .POST("/refresh-token", sessionController::refreshToken)
                .build();
    }
}
