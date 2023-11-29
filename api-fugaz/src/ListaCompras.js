import React, { useEffect, useState }  from 'react'
import CompraIndividual from './CompraIndividual'
import BarraBusqueda from './BarraBusqueda';
import axios from 'axios'
import './style.css';

function ListaCompras() {
    const [dataCompras, setDataCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() =>{
        axios.get('/api/compra/obtenercompras'). then(res => {
            console.log(res)
            setDataCompras(res.data)
        }).catch(err =>{
            console.log(err)
        })
    });

    const handleBusqueda = (busqueda) => {
    setSearchTerm(busqueda.toLowerCase());
    setIsSearching(true);
      };

    const filteredCompras = dataCompras.filter((compra) => {
        const nombreInsumo = compra.name_input.toLowerCase();
        const estadoInsumo = compra.status_input.toLowerCase();
        return (
          nombreInsumo.includes(searchTerm) ||
          estadoInsumo.includes(searchTerm)
        );
      });



    //mapeo de la lista
      const listacompras = (isSearching ? filteredCompras : dataCompras).map(compra => {
        return (
            <div key={compra.idbuy}>
              <CompraIndividual compra={compra} />
            </div>
          );
        });

    return(
        <div>
            <h2>Lista de Compras</h2>
            <div className="search">
        <BarraBusqueda onBuscar={handleBusqueda} />
      </div>
            <br/>
            <button className="agr btn btn-outline-light"
            onClick= { ()=>{window.location='agregarcompra'} } 
            >
                Agregar Compra
            </button>
            {listacompras.length ? listacompras : <p>No se encontraron resultados</p>}
        </div>
    )
}
export default ListaCompras