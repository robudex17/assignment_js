module.exports = class User {
    constructor(u,p){
        this.user = u;
        this.password = p;
    }
    listuser(){
        const innerfucntion = () => {
            console.log(`This is the object from the class ${JSON.stringify(this)}`);
        }
        innerfucntion();
    }
}