import axios from 'axios'
import React, { useEffect, useState }  from 'react'
import { useParams } from 'react-router-dom'

function EditarCompra() {

    const params = useParams()
    
        //hooks
        const [buy_date, setBuydate]=useState('')
        const [price_total, setPricetotal]=useState('')
        const [payment_methods, setPaymentmethods]=useState('')
        const [quantity, setQuantity]=useState('')
        const [subtotal, setSubtotal]=useState('')
        const [name_category, setNamecategory]=useState('')
        const [name_input, setNameinput]=useState('')
        const [stock, setStock]=useState('')
        const [unit_price, setUnitprice]=useState('')
        const [status_input, setStatusinput]=useState('')
        const [type, setType]=useState('')
        const [full_name, setFullname]=useState('')
        const [document, setDocument]=useState('')
        const [rut, setRut]=useState('')
        const [legal_representative_name, setLegalrepresentativename]=useState('')
        const [phone, setPhone]=useState('')
        const [address, setAddress]=useState('')
        const [statuspro, setStatuspro]=useState('')

    useEffect(() => {
        axios.post('/api/compra/obtenerdatacompra', {idbuy: params.idbuy}).then(res => {
            console.log(res.data[0])
            const datacompra = res.data[0]
            setBuydate(datacompra.buy_date)
            setPricetotal(datacompra.price_total)
            setPaymentmethods(datacompra.payment_methods)
            setQuantity(datacompra.quantity)
            setSubtotal(datacompra.subtotal)
            setNamecategory(datacompra.name_category)
            setNameinput(datacompra.name_input)
            setStock(datacompra.stock)
            setUnitprice(datacompra.unit_price)
            setStatusinput(datacompra.status_input)
            setType(datacompra.type)
            setFullname(datacompra.full_name)
            setDocument(datacompra.document)
            setRut(datacompra.rut)
            setLegalrepresentativename(datacompra.legal_representative_name)
            setPhone(datacompra.phone)
            setAddress(datacompra.address)
            setStatuspro(datacompra.statuspro)
        })
    }, [])

    //Funciín que actualiza
    function editarCompra() {
        //obj de actualizar
        const actualizarcompra ={
            buy_date: buy_date,
            price_total: price_total,
            payment_methods: payment_methods,
            quantity: quantity,
            subtotal: subtotal,
            name_category: name_category,
            name_input: name_input,
            stock: stock,
            unit_price: unit_price,
            status_input: status_input,
            type: type,
            full_name: full_name,
            document: document,
            rut: rut,
            legal_representative_name: legal_representative_name,
            phone: phone,
            address: address,
            statuspro: statuspro,
            idbuy: params.idbuy
        }


        //hacer la peticion con axios 
        axios.post('/api/compra/actualizacompra', actualizarcompra)
        .then(res => {
            console.log(res.data)
            if (res.data && res.data.message) {
            alert(res.data.message);
            } else {
            console.log(res); // Imprime la respuesta completa para ver su estructura
            alert('Compra actualizado');
            }
        })
        .catch(err => {
            console.log(err); // Imprime los errores en la consola para depuración
            alert('Error al procesar la solicitud');
        });
    }


    return(
        <div className='container'>
        <div className='row'>
            <h2 className='mt-4'>Editar Compra</h2>
        </div>

        <div className='row'>
                <div className='col-sm-6 offset-3'>
                    <div className='mb-3'>
                        <label htmlFor='buy_date' className='form-label'>Fecha de compra</label>
                        <input type='date' className='form-control' value={buy_date} onChange={(e) => {setBuydate(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='name_category' className='form-label'>Categoría</label>
                        <select className="form-control" value={name_category} onChange={(e) => setNamecategory(e.target.value)}>
                        <option value="">Seleccione el tipo</option>
                        <option value="punto">Telas tejido de punto</option>
                        <option value="plano">Telas tejido plano</option>
                        <option value="plano">Hilos</option>
                    </select>

                    </div>
                    <div className='mb-3'>
                        <label htmlFor='name_input' className='form-label'>Insumo</label>
                        <input type='text' className='form-control' value={name_input} onChange={(e) => {setNameinput(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='quantity' className='form-label'>Cantidad</label>
                        <input type='number' className='form-control' value={quantity} onChange={(e) => {setQuantity(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='stock' className='form-label'>Stock</label>
                        <input type='number' className='form-control' value={stock} onChange={(e) => {setStock(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='unit_price' className='form-label'>Precio unitario</label>
                        <input type='number' className='form-control' value={unit_price} onChange={(e) => {setUnitprice(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='status_input' className='form-label'>Estado del Insumo</label>
                        <input type='text' className='form-control' value={status_input} readOnly onChange={(e) => {setStatusinput(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='type' className='form-label'>Tipo de proveedor:</label>
                        <select className="form-control" value={type}onChange={(e) => setType(e.target.value)}>
                        <option value="">Seleccione el tipo</option>
                        <option value="natural">Natural</option>
                        <option value="empresa">Empresa</option>
                    </select>

                        {type === 'natural' && (
                        <div>
                            <div className='mb-3'>
                                <label htmlFor='full_name' className='form-label'>Nombre completo</label>
                                <input type="text" className="form-control" placeholder="Nombre completo" value={full_name} onChange={(e) => setFullname(e.target.value)} />
                            </div>

                            <div className='mb-3'>
                                <label htmlFor='document' className='form-label'>Documento</label>
                                <input type="text" className="form-control" placeholder="Documento" value={document} onChange={(e) => setDocument(e.target.value)} />
                                </div>
                        </div>
                        )}

                        {type === 'empresa' && (
                        <div>
                            <div className='mb-3'>
                                <label htmlFor='rut' className='form-label'>Rut</label>
                                <input type="text" className="form-control" placeholder="Rut" value={rut} onChange={(e) => setRut(e.target.value)} />
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='legal_representative_name' className='form-label'>Representante legal</label>
                            <input type="text" className="form-control" placeholder="Representante Legal" value={legal_representative_name} onChange={(e) => setLegalrepresentativename(e.target.value)} />
                            </div>
                        </div>
                        )}
                    <div className='mb-3'>
                        <label htmlFor='phone' className='form-label'>Telefono</label>
                        <input type='text' className='form-control' value={phone} onChange={(e) => {setPhone(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='address' className='form-label'>Dirección</label>
                        <input type='text' className='form-control' value={address} onChange={(e) => {setAddress(e.target.value)}}></input>
                    </div>
                    <div className='mb-3'>
                            <label htmlFor='statuspro' className='form-label'>Estado del Proveedor</label>
                            <select className='form-control' value={statuspro} onChange={(e) => {setStatuspro(e.target.value)}}>
                                <option value='Activo'>Activo</option>
                                <option value='Inactivo'>Inactivo</option>
                            </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='payment_methods' className='form-label'>Metodo de pago</label>
                        <select type='text' className='form-control' value={payment_methods} onChange={(e) => setPaymentmethods(e.target.value)}>
                            <option value=''>Seleccione método de pago</option>
                            <option value='Efectivo'>Efectivo</option>
                            <option value='Transferencia'>Transferencia</option>
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='subtotal' className='form-label'>Subtotal</label>
                        <input type='number' className='form-control' value={subtotal} onChange={(e) => {setSubtotal(e.target.value)}}></input>
                    </div>                      

                    <div className='mb-3'>
                        <label htmlFor='price_total' className='form-label'>Precio total</label>
                        <input type='number' className='form-control' value={price_total} onChange={(e) => {setPricetotal(e.target.value)}}></input>
                    </div>

                <button onClick={editarCompra} className="btn btn-success">Actualizar Compra</button>
            </div>
        </div>
    </div>
    </div>
    )
}
export default EditarCompra