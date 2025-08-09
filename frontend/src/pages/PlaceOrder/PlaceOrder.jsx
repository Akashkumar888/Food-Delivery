// PlaceOrder.jsx
import React, { useContext, useEffect, useState } from 'react';
import './placeOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url,discount, setDiscount } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });
    const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
    const totalAmount = getTotalCartAmount() + deliveryFee -discount;

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
    };


    try {
      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        const { order, key, orderId } = res.data;

        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          alert('Razorpay SDK failed to load');
          return;
        }

        const options = {
          key: key,
          amount: order.amount,
          currency: order.currency,
          name: 'My Food App',
          description: 'Order Payment',
          order_id: order.id,
          handler: function (response) {
            // Redirect to /verify page with necessary parameters
            navigate(
              `/verify?orderId=${orderId}&razorpay_order_id=${response.razorpay_order_id}&razorpay_payment_id=${response.razorpay_payment_id}&razorpay_signature=${response.razorpay_signature}`
            );
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert('Order placement failed');
      }
    } catch (error) {
      console.error('Order Error:', error);
      alert('Something went wrong');
    }
  };
  

  // Inside PlaceOrder.jsx
const handleCOD = async () => {
  let orderItems = [];
  food_list.forEach((item) => {
    if (cartItems[item._id] > 0) {
      orderItems.push({ ...item, quantity: cartItems[item._id] });
    }
  });

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 40;
  const totalAmount = getTotalCartAmount() + deliveryFee -discount;

  const orderData = {
    address: data,
    items: orderItems,
    amount: totalAmount
  };

  try {
    const res = await axios.post(`${url}/api/order/place-cod`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      navigate("/myorders");
    } else {
      alert("COD Order placement failed");
    }
  } catch (error) {
    console.error("COD Order Error:", error);
    alert("Something went wrong");
  }
};


  return (
    <form className="place-order" onSubmit={onSubmitHandler}>
      {/* Left side form */}
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" required />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" required />
        </div>
        <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" required />
        <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" required />
        <div className="multi-fields">
          <input name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" required />
          <input name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" required />
        </div>
        <div className="multi-fields">
          <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" required />
          <input name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" required />
        </div>
        <input name="phone" value={data.phone} onChange={onChangeHandler} type="text" placeholder="Phone number" required />
      </div>

      {/* Right side cart summary */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>Rs.{getTotalCartAmount() === 0 ? 0 : 40}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>Rs.{getTotalCartAmount() + 40 - discount}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
          <h2 className='or'>OR</h2>
          <button type="button" onClick={handleCOD}>
            Cash On Delivery (COD)
          </button>


        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

