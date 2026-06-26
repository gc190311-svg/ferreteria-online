"use client";

export default function OrdenarProductos(){

    return(

        <div
            className="
            flex
            justify-end
            mb-6
            "
        >

            <select
                className="
                border
                rounded-xl
                p-3
                bg-white
                "
            >

                <option>

                    Ordenar por

                </option>

                <option>

                    Precio menor

                </option>

                <option>

                    Precio mayor

                </option>

                <option>

                    Nombre A-Z

                </option>

                <option>

                    Nombre Z-A

                </option>

                <option>

                    Más recientes

                </option>

            </select>

        </div>

    );

}
