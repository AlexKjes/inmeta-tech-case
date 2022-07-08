package no.techcase.config

import org.springframework.context.annotation.Profile
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.CorsRegistry

@Profile("dev")
@Component
class SpringDataRestConfig : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(
        config: RepositoryRestConfiguration, cors: CorsRegistry
    ) {
        cors.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "PUT", "DELETE", "POST", "OPTION", "PATCH")
    }
}