import React from "react";
import { FormStuff } from "./FormStuff";
function AuthElem({onSubmit, btnText, name , elemttl, children}) {
    const { values, handleChange, resetForm } =
    FormStuff();
   function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.email, values.password)
   }
   React.useEffect(() => {
    resetForm(
        { email: "", password: "" },
        { email: "", password: "" },
        { email: true, password: true }
    );
}, []);

return(
    <div className ="auth__wrapper">
        <h2 className="auth__title">{elemttl}</h2>
        <form className ="auth__form" name={`auth__form-${name}`} onSubmit={handleSubmit} >
            <div className ="auth__inputwrap">
                <input type="email" className = "auth__email"  placeholder="E-mail" name="email" required onChange={handleChange}/>
                <input type="password" className ="auth__password" placeholder="Пароль" name="password" required onChange={handleChange}/>
                <input type ="submit" className = "auth__submit" value ={btnText} />              
                
                
            </div>
        </form>
        {children}
    </div>
)
}

export default AuthElem;