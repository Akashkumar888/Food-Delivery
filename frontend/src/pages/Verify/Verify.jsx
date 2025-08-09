// Verify.jsx
import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const razorpay_order_id = searchParams.get('razorpay_order_id');
      const razorpay_payment_id = searchParams.get('razorpay_payment_id');
      const razorpay_signature = searchParams.get('razorpay_signature');
      const orderId = searchParams.get('orderId');

      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          orderId,
        });

        if (response.data.success) {
          navigate('/myorders');
        } else {
          alert('Payment verification failed');
          navigate('/');
        }
      } catch (err) {
        console.error('Verification error:', err);
        alert('Something went wrong while verifying payment');
        navigate('/');
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
