
CREATE TABLE CUSTOMER (
    uuid varchar unique,
    name varchar not null,
    phone_number varchar not null unique,
    email_address varchar not null unique,
    PRIMARY KEY(uuid)
);

CREATE TABLE INCOMING_ORDER (
      uuid varchar,
      customer_id varchar not null,
      from_address_street varchar not null,
      from_address_postal_code varchar not null,
      from_address_region varchar not null,
      to_address_street varchar not null,
      to_address_postal_code varchar not null,
      to_address_region varchar not null,
      execution_date varchar,
      service_types varchar,
      note varchar,
      PRIMARY KEY (uuid),
      FOREIGN KEY (customer_id) REFERENCES CUSTOMER(uuid)
);