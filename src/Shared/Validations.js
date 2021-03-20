
//Generic Validations
export const validateForm=(errors)=>{
    debugger
   let valid = true;
   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
   return valid;
 } 
export const namevalidation=(name)=>
{
    debugger
if(name.length < 5)
{
    return "the name must have more than 5 characters";
}
else if((/^[A-Za-z0-9 ]+$/).test(name) === false)
{
   return "the name should not be contain special characters"
}
else{
    return "";
}
}

export const selectvalidation=(selectedvalue)=>
{
    debugger
if(selectedvalue === "0")
{
    return "Please select";
}
else
{
    return "";
}

}

export const multiselectvalidation=(selectedvalue)=>
{
    debugger
if(selectedvalue === "0")
{
    return "Please select";
}
else if(selectedvalue === "")
{
    return "Please select";
}
else
{
    return "";
}

}

export const urlvalidation=(url)=>
{
    debugger
    if(url.includes('/') === true)
    {
        return "Please remove / from url"
    }
    else
    {
        return ""
    }

}










