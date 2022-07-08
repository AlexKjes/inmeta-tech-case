import {makeAutoObservable} from "mobx";

export interface CustomerInterface {
    name: string,
    phoneNumber: string,
    emailAddress: string
}

export interface CustomerHAL extends CustomerInterface{
    uuid: string
    _links: {self: {href: string}}
}

export default class Customer implements CustomerInterface {

    readonly customerHAL: CustomerHAL;

    uuid: string

    private _name: string;
    get name() { return this._name; }
    set name(name: string) { this._name = name; }

    private _phoneNumber: string;
    get phoneNumber() { return this._phoneNumber; }
    set phoneNumber(phoneNumber: string) { this._phoneNumber = phoneNumber; }

    private _emailAddress: string;
    get emailAddress() { return this._emailAddress; }
    set emailAddress(emailAddress: string) { this._emailAddress = emailAddress; }

    constructor(customerHAL: CustomerHAL) {
        makeAutoObservable(this);
        this.customerHAL = customerHAL;
        this.uuid = customerHAL.uuid;
        this.name = customerHAL.name;
        this.phoneNumber = customerHAL.phoneNumber;
        this.emailAddress = customerHAL.emailAddress;
    }

    update(): Promise<void> {
        const dto = Object.assign(this.customerHAL, {
            name: this.name,
            phoneNumber: this.phoneNumber,
            emailAddress: this.emailAddress
        });
        return fetch(this.customerHAL._links.self.href,
            {
                method: "PATCH",
                body: JSON.stringify(dto),
                headers: {
                    "Content-Type": "application/hal+json"
                }
            }).then(() => Promise.resolve());
    }

    delete(): Promise<void> {
        return fetch(this.customerHAL._links.self.href, {method: "DELETE"})
            .then(() => Promise.resolve());
    }

}