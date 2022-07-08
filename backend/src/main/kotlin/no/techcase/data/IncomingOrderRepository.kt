package no.techcase.data

import no.techcase.domain.IncomingOrder
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.annotation.RestResource


@RepositoryRestResource(path = "order", collectionResourceRel = "order", itemResourceRel = "order")
interface IncomingOrderRepository : PagingAndSortingRepository<IncomingOrder, String>{

    // Added during live tech interview
    @RestResource(path = "byNote")
    fun findAllByNoteLike(note: String): List<IncomingOrder>

}