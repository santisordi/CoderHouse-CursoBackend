import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import trash from "./image/trash.svg";
import { Link } from "react-router-dom";

const Cart = () => {
    const {cart, removeItem, clear, cartTotal, sumTotal} = useContext(CartContext)

    if(cartTotal() === 0){
        return (
            <div className="container my-5">
                <div className="row text-center">
                    <div className="col">
                        <div className="alert alert-secondary" role="alert">
                            Carrito Vacio.
                        </div>
                    </div>

                </div>
            </div>
        )
    }


    return (
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                    <h1>Productos Seleccionados</h1>
                </div>
            </div>
            <div className="row">
                <div className="col my-5">
                    <table className="table">
                        <tbody>
                            {
                                cart.map(item => (
                                    <tr key={item.id}>
                                        <td><img src={"/assets/images/" + item.imagen} alt={item.titulo} width={90} /></td>
                                        <td className="align-middle">{item.titulo}</td>
                                        <td className="align-middle">{item.quantity} x ${item.precioMay}</td>
                                        <td className="align-middle text-center">${item.quantity * item.precioMay}</td>
                                        <td className="align-middle text-end"><button className="btn btn-light" onClick={() => {removeItem(item.id)}} title="Eliminar Producto"><img src={trash} alt="Eliminar Producto" width={25} /></button></td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td colSpan={3} className="align-middle text-end">Total a Pagar</td>
                                <td className="text-center">${sumTotal()}</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="row">
                        <div className="col text-end">
                            <button className="btn btn-light" onClick={() => {clear()}} title="Vaciar Carrito">Vaciar Carrito</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-end py-2">
                            <Link to = {"/checkout"}className="btn btn-light" title="Finalizar compra">Finalizar compra</Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Cart;