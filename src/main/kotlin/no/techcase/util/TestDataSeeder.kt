package no.techcase.util

import no.techcase.data.CustomerRestRepository
import no.techcase.data.IncomingOrderRepository
import no.techcase.domain.Address
import no.techcase.domain.Customer
import no.techcase.domain.IncomingOrder
import no.techcase.domain.ServiceType
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import java.time.LocalDateTime

@Profile("dev")
@Configuration
class TestDataSeeder(
    val customerRestRepository: CustomerRestRepository,
    val incomingOrderRepository: IncomingOrderRepository
) {

    @Bean
    fun seedTestData() {

        val customer1 = Customer(
            uuid = null,
            name = "Testy Test",
            emailAddress = "mail@address.tld",
            phoneNumber = "3443545"
        )

        val order = IncomingOrder(
            uuid = null,
            customer =  customer1,
            executionDate = LocalDateTime.now(),
            serviceTypes = listOf(ServiceType.PACKING, ServiceType.MOVING),
            toAddress = Address("Test Street 1B", "1881", "Oslo"),
            fromAddress = Address("Test Street 42B", "1881", "Oslo"),
            note = "this is a test order"
        )
        customerRestRepository.save(customer1)
        incomingOrderRepository.save(order)

    }
}