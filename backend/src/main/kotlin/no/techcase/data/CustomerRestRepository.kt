package no.techcase.data

import no.techcase.domain.Customer
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource


@RepositoryRestResource(path = "customer", collectionResourceRel = "customer")
@SuppressWarnings("unused")
interface CustomerRestRepository : PagingAndSortingRepository<Customer, String> {

    @RestResource(path = "by")
    fun findAllByEmailAddressLikeOrNameLikeOrPhoneNumberLike(
        @Param("email") emailAddress: String?,
        name: String?,
        @Param("phone") phoneNumber: String?): Collection<Customer>


}