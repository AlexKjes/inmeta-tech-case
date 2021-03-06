package no.techcase.domain

import com.fasterxml.jackson.annotation.JsonMerge
import com.fasterxml.jackson.annotation.OptBoolean
import no.techcase.util.ServiceConverter
import org.hibernate.annotations.GenericGenerator
import java.time.LocalDateTime
import javax.persistence.*

@Suppress("unused")
@Entity
data class IncomingOrder(
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator",
    )
    @Column(name = "uuid", nullable = false)
    val uuid: String? = null,
    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "uuid")
    val customer: Customer?,
    @Embedded
    @JsonMerge
    @AttributeOverrides(
        AttributeOverride( name = "street", column = Column(name = "from_address_street")),
        AttributeOverride( name = "postalCode", column = Column(name = "from_address_postalCode")),
        AttributeOverride( name = "region", column = Column(name = "from_address_region"))
    )
    val fromAddress: Address,
    @Embedded
    @JsonMerge
    @AttributeOverrides(
        AttributeOverride( name = "street", column = Column(name = "to_address_street")),
        AttributeOverride( name = "postalCode", column = Column(name = "to_address_postalCode")),
        AttributeOverride( name = "region", column = Column(name = "to_address_region"))
    )
    var toAddress: Address,
    @Convert(converter = ServiceConverter::class)
    @JsonMerge(OptBoolean.FALSE)
    var serviceTypes: Collection<ServiceType>,
    @Column
    val executionDate: LocalDateTime,
    @Column
    val note: String
)