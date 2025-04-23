
export const validation=(email:string,password:string)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)||!passwordRegex.test(password)) {
        return false;
    }
    return true;

} 

