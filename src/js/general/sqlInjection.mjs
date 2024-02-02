export {SqlInjection};

/*Ways to determine if it is a sql injection attack:
1) Check if there is whitespace. The input cannot be a sql
command if there's no spaces, because every sql query requires
multiple words and spaces between them.
2) If you want to allow whitespace in your input then you
have to use this longer approach: Check if the input
has any of the keywords of a list of which one would have to be part
of the query.
(Checking for a semicolon isn't an option because the user can
do what they want in a subquery without needing to use a
semicolon.)*/

class SqlInjection{
    /*The user passes in either a string or an array
    of strings to be checked if they could be a sql
    injection.*/

    static whitespaceCheck(strOrArr){
        return this.check(strOrArr, new Whitespace());
    }

    static keywordCheck(strOrArr){
        return this.check(strOrArr, new Keyword());
    }

    static check(strOrArr, obj){
        if(typeof(strOrArr) === "string"){
            return obj.checkStr(strOrArr);
        }
        return obj.checkArr(strOrArr);
    }
}

class CheckArr{
    checkArr(strArr){
        let isInjection;
        for(let i = 0; i < strArr.length; i++){
            isInjection = this.checkStr(strArr[i]);
            if(isInjection){
                return true;
            }
        }
        return isInjection;
    }

    checkStr(){
        /*This is acting as an abstract method so checkArr
        can call the subclcass's checkStr.*/
    }
}

class Whitespace extends CheckArr{
    checkStr(str){
        const regex = /.*\s.*/;
        return regex.test(str);
    }
}

class Keyword extends CheckArr{
    checkStr(str){
        const upperStr = str.toUpperCase();
        return (
            upperStr.includes("TABLE") ||
            upperStr.includes("DATABASE") ||
            upperStr.includes("GRANT") ||
            upperStr.includes("REVOKE") ||
            upperStr.includes("COMMIT") ||
            upperStr.includes("ROLLBACK") ||
            upperStr.includes("SAVEPOINT") ||
            upperStr.includes("USE") ||
            upperStr.includes("SHOW") ||
            upperStr.includes("DESCRIBE") ||
            upperStr.includes("DESC")
        );
    }
}