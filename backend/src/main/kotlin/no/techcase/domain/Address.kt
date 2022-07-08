package no.techcase.domain

import javax.persistence.Column
import javax.persistence.Embeddable

@Embeddable
data class Address (
    @Column(insertable = false, updatable = false)
    var street: String,
    @Column(insertable = false, updatable = false)
    val postalCode: String,
    @Column(insertable = false, updatable = false)
    val region: String
)
