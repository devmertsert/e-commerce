export const handleErrors = (err: any) => {
    if(err.name == "ValidationError") {
        let errors = err.errors;
        let data = Object.keys(errors).map(val => {
            let suggestion = typeof val == "string" ? errors[val].value + "-" + Math.random().toString(36).split(".")[1] : 1;
            return {
                key: val,
                message: errors[val].message,
                suggestion: suggestion
            }
        })

        return {
            code: 422,
            message: "Validation error",
            status: "error",
            errors: data
        }
    }
    if(err.name == "MongoError" && err.code == 11000) {
        let str = err.message.match(/(?<=\{)(.*)(?=})/)[0].trim();
        let splitted = str.split(":");
        
        let key = splitted[0];
        let value = splitted[1].trim().replace(/\"/g, "");
        console.log("STRING:", err.message);
        return {
            code: 422,
            message: "Validation error",
            status: "error",
            errors: [{
                [key]: value
            }]
        }
    }
    
    return {
        code: err.code > 500 ? 500 : err.code,
        message: err.message,
        status: "error",
        errors: err.errors || []
    }
}