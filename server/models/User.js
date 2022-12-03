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
    constructor(user){
        Object.keys(user).forEach(key =>
            this[key] = user[key]
        )
    }
}

module.exports = User;
