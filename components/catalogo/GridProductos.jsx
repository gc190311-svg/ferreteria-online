"use client";

import { useEffect, useState } from "react";

import {
    collection,
    getDocs
} from "firebase/firestore";

import { db } from "../../app/firebase";

import CardProducto from "./CardProducto";

export default function GridProductos() {

    const [productos,setProductos]=useState([]);

    useEffect(()=>{

        cargarProductos();

    },[]);

    async function cargarProductos(){

        const querySnapshot=await getDocs(
            collection(db,"productos")
        );

        const lista=[];

        querySnapshot.forEach((doc)=>{

            lista.push({
                id:doc.id,
                ...doc.data()
            });

        });

        setProductos(lista);

    }

    return(

        <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
            "
        >

            {productos.map((producto)=>(

                <CardProducto
                    key={producto.id}
                    producto={producto}
                />

            ))}

        </div>

    );

}
