/**
 * Constructor function for new User objects
 * @param {int} id 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} email 
 * @param {string} password 
 * @param {string} salt 
 * @param {boolean} email_verified 
 * @param {string} phone_number 
 * @param {string} role 
 * @param {string} token 
 */
class User{
    constructor(id, name, surname, email, password, salt, email_verified, phone_number, role, token){
        this.id=id;
        this.name=name;
        this.surname=surname;
        this.email=email;
        this.password=password;
        this.salt=salt;
        this.email_verified=email_verified;
        this.phone_number=phone_number;
        this.role=role;
        this.token=token;
    }
}

module.exports = User;
