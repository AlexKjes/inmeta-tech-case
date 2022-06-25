package no.techcase.domain

import org.hibernate.annotations.GenericGenerator
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Suppress("unused")
@Entity
class Customer(
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator",
    )
    @Column(name = "uuid", nullable = false)
    val uuid: String? = null,
    @Column(nullable  =  false)
    val name: String,
    @Column(unique = true, nullable = false)
    val phoneNumber: String,
    @Column(unique = true, nullable = false)
    val emailAddress: String,
)