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

        for (i in 1..10) {
            createOrder(i)
        }

    }

    private fun createOrder(id: Int) {

        val customer = Customer(
            uuid = null,
            name = "Test customer $id",
            emailAddress = "customer$id@address.tld",
            phoneNumber = "3443545$id"
        )

        val order = IncomingOrder(
            uuid = null,
            customer =  customer,
            executionDate = LocalDateTime.now(),
            serviceTypes = listOf(ServiceType.PACKING, ServiceType.MOVING),
            toAddress = Address("Test Street $id", "1881", "Oslo"),
            fromAddress = Address("Test Street $id", "1881", "Oslo"),
            note = "this is test order number $id"
        )
        customerRestRepository.save(customer)
        incomingOrderRepository.save(order)
    }
}