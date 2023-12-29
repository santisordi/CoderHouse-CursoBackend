import { useEffect, useState } from "react";
import Loading from "./Loading";
import ItemList from "./ItemList";

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const queryParams = {
        limit: '',
        page: '',
        filter: '',
        sort: 'asc',
    };

    const queryString = new URLSearchParams(queryParams).toString();
    
    const fethProducts = async () => {
        const response = await fetch(`http://localhost:3000/api/products?${queryString}`, {
            method:'GET',    
            headers: {
                    'Content-type': 'application/json',
                }
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log(data.docs);
            setProducts(data.docs);
            setLoading(false); // Cambia el estado a "false" cuando los datos están listos
        }     
    }; 

    useEffect(() => {
        // Define una función asíncrona y llámala inmediatamente
        async function fetchData() {
            await fethProducts();
        }
        fetchData();
    }, []);
    
    return (
            <div className="container my-5">
                <div className="row">
                {loading ? <Loading /> : <ItemList products={products} />  }  
                </div>
            </div>
    );
};

export default ItemListContainer;

// import { useParams } from "react-router-dom";
// import { getFirestore, collection, getDocs, where, query } from "firebase/firestore"
//import productos from "./json/productos.json"


//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const {id} = useParams(); 

//     useEffect(()=> {
//         const db = getFirestore();
//         const itemsCollection = collection (db, "items");
//         const q = id ? query(itemsCollection, where("categoria", "==", id)) : itemsCollection;
//         getDocs(q).then(resultado => {
//             if (resultado.size > 0) {
//                 setItems(resultado.docs.map(producto => ({id:producto.id, ...producto.data()})));
//                 setLoading(false);
//             } else {
//                 console.log("Error! no hay productos")
//             }
//         });
//     },[id]);

// //proceso de impoortacion de archivos json al firestore

//     // useEffect(() => {
//     //     const db = getFirestore()
//     //     const intemsCollection = collection(db, "items")

//     //     productos.forEach(producto => {
//     //         addDoc(intemsCollection, producto);
//     //     });
        
//     // }, []);//importante los corchetes para que se ejecute una vez
    
//     return (
//             <div className="container my-5">
//                 <div className="row">
//                 {loading ? <Loading /> : <ItemList productos={items} />  }  
//                 </div>
//             </div>
//     );