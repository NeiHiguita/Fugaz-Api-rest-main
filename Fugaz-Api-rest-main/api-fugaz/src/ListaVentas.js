import React, { useEffect, useState }  from 'react'
import VentaIndividual from './VentaIndividual'
import BarraBusqueda from './BarraBusqueda';
import axios from 'axios'
import './style.css';

function ListaVentas() {
    const[dataventas, setdataventa]=useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() =>{
        axios.get('/api/venta/obtenerventas')
        .then(res => {
            console.log(res)
            setdataventa(res.data)
        }).catch(err =>{
            console.log(err)
        })
    })

    const handleBusqueda = (busqueda) => {
        setSearchTerm(busqueda.toLowerCase());
        setIsSearching(true);
    };
        const filteredVentas = dataventas.filter((venta) => {
        const nombreVenta = (venta.name || '').toLowerCase();
        const ciudadVenta = (venta.city || '').toLowerCase();
        const fechaPedido = (venta.date_order || '').toLowerCase();
        const fechaEntrega = (venta.deliver_date || '').toLowerCase();
        const metodoPago= (venta.Method_payment || '').toLowerCase();
        const document = (venta.document || '').toLowerCase();
        return (
          nombreVenta.includes(searchTerm) ||
          ciudadVenta.includes(searchTerm) ||
          fechaPedido.includes(searchTerm) ||
          fechaEntrega.includes(searchTerm) ||
          metodoPago.includes(searchTerm) ||
          document.includes(searchTerm) 
        );
    });

    //mapeo de la lista
    const listaventas = (isSearching ? filteredVentas : dataventas).map(venta =>{
        return(
            <div key={venta.idsale}>
                <VentaIndividual venta={venta}/>
            </div>
        )
    } )
    


    return(
        <div>
            <h2>Lista de ventas</h2>
            <div className="search">
        <BarraBusqueda onBuscar={handleBusqueda} />
      </div>
            <br/>
            <button className="agr btn btn-outline-light"
            onClick= { ()=>{window.location='agregarventa'} } 
            >
                Agregar Venta
            </button>
            {listaventas.length ? listaventas : <p>No se encontraron resultados</p>}
           
        </div>
    )
}
export default ListaVentas