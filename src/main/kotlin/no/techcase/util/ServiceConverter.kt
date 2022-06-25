package no.techcase.util

import no.techcase.domain.ServiceType
import javax.persistence.AttributeConverter
import javax.persistence.Converter

@Converter
class ServiceConverter : AttributeConverter<List<ServiceType>, String> {

    override fun convertToDatabaseColumn(attribute: List<ServiceType>?): String {
        return if (attribute == null) {
            ""
        } else {
            attribute.joinToString()
        }
    }

    override fun convertToEntityAttribute(dbData: String?): List<ServiceType> {
        return if (dbData == null) {
            emptyList()
        } else {
            dbData.split(",").stream()
                .map { ServiceType.valueOf(it.trim()) }
                .toList()
        }
    }

}