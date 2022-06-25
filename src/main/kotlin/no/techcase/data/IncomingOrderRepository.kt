package no.techcase.data

import no.techcase.domain.IncomingOrder
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(path = "order", collectionResourceRel = "order")
interface IncomingOrderRepository : PagingAndSortingRepository<IncomingOrder, String>