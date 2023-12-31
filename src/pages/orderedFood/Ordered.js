import React, { useEffect, useState } from 'react'
import './Ordered.css'
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db} from '../../Firebase/FirebaseConfig'
import { Link } from 'react-router-dom';


const Ordered = () => {
    const [allorders, setAllOrders] = useState([])
    const [allordersstatus, setAllOrdersStatus] = useState('')
    const [keyword, setKeyword] = useState('')

    const getAllOrder = async()=>{
        setAllOrders([])
        const getAllOrders = await getDocs(collection(db,'PaymentCart'))
        const ordersData = [];
        getAllOrders.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            ordersData.push(doc.data());
        });
        setAllOrders(ordersData);
    }

    useEffect(()=>{
        getAllOrder()
    },[])


    const changeOrderStatus = (id, orderdata, status) => {
        const docRef = doc(db, "PaymentCart", id);
        const data = {
            ...orderdata,
            orderStatus: status
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrder()
    }


    const changeDeliveryboyName = (id, orderdata, boyname) => {
        console.log(id, orderdata, boyname)
        const docRef = doc(db, "PaymentCart", id);
        const data = {
            ...orderdata,
            deliveryboy_name: boyname
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrder()
    }

    const changeDeliveryboyPhone = (id, orderdata, boyphone) => {
        console.log(id, orderdata, boyphone)
        const docRef = doc(db, "PaymentCart", id);
        const data = {
            ...orderdata,
            deliveryboy_phone: boyphone
        }
        setDoc(docRef, data).then(() => {
            alert("Document successfully written!");
        })
            .catch((error) => {
                alert("Error writing document: ", error);
            })

        getAllOrder()
    }

    return (
        <div className="order-section">
            <h1 className="order-head1">Order Section</h1>
            <div className="order-s1">
                <input type="text" placeholder="Search by order id or delivery status" className='searchbar'
                    onChange={(e) => setKeyword(e.target.value)} />

                <div className="order-s1-in">
                    <p>Sort by Order Status</p>
                    <select className='ordertxt' onChange={(e) => setAllOrdersStatus(e.target.value)}>
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="ontheway">On the way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className='order__container'>
                <div className="order-row_card1">
                    <p className='ordertxt'> OrderId</p>
                    <p className='ordertxt'>Paid</p>
                    <p className='ordertxt'>Delivery Status</p>
                    <p className='ordertxt'>Delivery Boy Name</p>
                    <p className='ordertxt'>Delivery Boy Phone</p>

                    <p className='ordertxt'>Cost</p>
                    <button>Show Details</button>
                </div>
                <div className="order__container">
                    {/* data */}
                    {allorders.filter((val) => {
                        if (allordersstatus === "") {
                            return val
                        }
                        else if (val.orderStatus.toLowerCase().includes(allordersstatus.toLowerCase())) {
                            return val
                        }
                    })
                        .filter((val) => {
                            if (keyword === "") {
                                return val
                            }
                            else if (val.orderId.toLowerCase().includes(keyword.toLowerCase()) || val.orderStatus.toLowerCase().includes(keyword.toLowerCase()) || val.deliveryboy_name.toLowerCase().includes(keyword.toLowerCase())) {
                                return val
                            }
                        }).map((order) => {
                            return (
                                <div className="order-row_card">
                                    <p className='ordertxt'> {order.orderId}</p>
                                    <p className='ordertxt'> {order.orderPayment}</p>
                                    <div className="order-card-in">
                                        {order.orderStatus === 'pending' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                <option value="pending">Pending</option>
                                                <option value="ontheway">On the way</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }
                                        {order.orderStatus === 'ontheway' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                <option value="ontheway">On the way</option>

                                                <option value="pending">Pending</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }
                                        {order.orderStatus === 'delivered' &&
                                            <select className='ordertxt' onChange={(e) => changeOrderStatus(order.orderId, order, e.target.value)}>
                                                <option value="delivered">Delivered</option>
                                                <option value="ontheway">On the way</option>
                                                <option value="pending">Pending</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        }

                                        {order.orderStatus === 'cancelled' && <p className='ordertxt'> {order.orderStatus}</p>}
                                    </div>
                                    {order.deliveryboy_name ? <p className='ordertxt'> {order.deliveryboy_name}</p> :
                                        <input type="text" placeholder="Enter deliveryboy name" className='orderinput' onBlur={(e) => changeDeliveryboyName(order.orderId, order, e.target.value)} />}

                                    {order.deliveryboy_phone ? <p className='ordertxt'> {order.deliveryboy_phone}</p> :
                                        <input type="text" placeholder="Enter deliveryboy phone" className='orderinput' onBlur={(e) => changeDeliveryboyPhone(order.orderId, order, e.target.value)} />}

                                    <p className='ordertxt'>{order.orderCost}</p>
                                    <Link to={`/orderdetails/${order.orderId}`}><button>Show Details</button></Link>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Ordered