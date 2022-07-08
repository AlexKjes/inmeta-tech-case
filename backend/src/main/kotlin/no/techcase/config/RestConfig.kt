package no.techcase.config

import no.techcase.domain.Customer
import no.techcase.domain.IncomingOrder
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer
import org.springframework.stereotype.Component
import org.springframework.web.servlet.config.annotation.CorsRegistry


@Component
class RestConfig : RepositoryRestConfigurer {
    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration, cors: CorsRegistry) {
        config.exposeIdsFor(Customer::class.java, IncomingOrder::class.java)
    }
}