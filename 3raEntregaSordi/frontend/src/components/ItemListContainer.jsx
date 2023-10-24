import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs, where, query } from "firebase/firestore"
import Loading from "./Loading";
//import productos from "./json/productos.json"

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams(); 

    useEffect(()=> {
        const db = getFirestore();
        const itemsCollection = collection (db, "items");
        const q = id ? query(itemsCollection, where("categoria", "==", id)) : itemsCollection;
        getDocs(q).then(resultado => {
            if (resultado.size > 0) {
                setItems(resultado.docs.map(producto => ({id:producto.id, ...producto.data()})));
                setLoading(false);
            } else {
                console.log("Error! no hay productos")
            }
        });
    },[id]);

//proceso de impoortacion de archivos json al firestore

    // useEffect(() => {
    //     const db = getFirestore()
    //     const intemsCollection = collection(db, "items")

    //     productos.forEach(producto => {
    //         addDoc(intemsCollection, producto);
    //     });
        
    // }, []);//importante los corchetes para que se ejecute una vez
    
    return (
            <div className="container my-5">
                <div className="row">
                {loading ? <Loading /> : <ItemList productos={items} />  }  
                </div>
            </div>
    );
};

export default ItemListContainer;
    