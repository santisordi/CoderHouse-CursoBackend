import { useRef } from "react";

export const Login = () => {
    const formRef = useRef(null); // Captura la referencia del formulario

    const handleSbmit =  async (e) => { //esto es para reemplasar el usestate y hacerlo mas rapido y simple
        e.preventDefault(); 
        const dataForm = new FormData(formRef.current);//transforma la data del form html en un objeto iterable
        const data = Object.fromEntries(dataForm);  //dado un objeto iterator me lo transforma en una simple
        
        const response = await fetch('http://localhost:4000/api/sessions/login', {
            method:'POST',    
            headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            }); 
            console.log(response)
    };

    return (
        <div className="text-center my-5">
            <div className="container-fluid">
                <h2>Formulario de Login</h2>
                <form onSubmit={handleSbmit} ref={formRef}>
                    <div className="mb-3">
                        <label htmlFor="email">Ingrese su email</label>
                        <input type="text" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Ingrese su contraseña</label>
                        <input type="password" name="password" /> {/* Corrige el atributo name */}
                    </div>
                    <button type="submit" className="btn btn-dark">Iniciar sesión</button>
                </form>
            </div>
        </div>

    );
};

export default Login;

