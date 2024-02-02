import {conn} from "../../../../server.mjs";
import {SqlInjection} from "../../../general/sqlInjection.mjs";
export {Credentials};

class Credentials{
    #credentialsType;
    #username;
    #password;

    async main(credentialsType, username, password){
        const isSqlInjection = SqlInjection.whitespaceCheck([username, password]);
        if(isSqlInjection){
            return {
                userId: null,
                response: "Don't use spaces. Try again."
            };
        }

        this.setCredentials(credentialsType, username, password);

        let userId;
        if(this.#credentialsType === "loggingIn"){
            userId = await this.loggingIn();
        }
        else{
            userId = await this.creatingAccount();
        }
        const response = this.getResponse(userId !== null);
        return {
            userId,
            response
        };
    }

    setCredentials(credentialsType, username, password){
        this.#credentialsType = credentialsType;
        this.#username = username;
        this.#password = password;
    }

    async loggingIn(){
        const queryStr = `
            SELECT user_id FROM User 
            WHERE username = '${this.#username}' 
            AND password_hash = '${this.#password}';`;
        const [rows] = await (conn.promise().query(queryStr));
        const credsExist = rows.length !== 0;
        let userId = null;
        if(credsExist){
            userId = rows[0]["user_id"];
        }
        return userId;
    }

    async creatingAccount(){
        const queryStr = `
            INSERT IGNORE INTO User 
            (username, password_hash) 
            VALUES ('${this.#username}', '${this.#password}');`;
        const [result] = await (conn.promise().query(queryStr));
        let userId = null;
        //If the insertion wasn't ignored.
        if(result.affectedRows === 1){
            const [rows] = await (conn.promise().query(`SELECT LAST_INSERT_ID() AS userId;`));
            userId = rows[0]["user_id"];
        }
        return userId;
    }
    
    getResponse(isValid){
        if(isValid){
            if(this.#credentialsType === "loggingIn"){
                return `Hello, ${this.#username}. You're logged in.`;
            }
            else if(this.#credentialsType === "creatingAccount"){
                return "Account creation successful. You're logged in.";
            }
        }
        return "Invalid credentials.";
    }
}