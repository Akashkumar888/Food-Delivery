import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
  
  const url="https://food-delivery-backend7.onrender.com"
  const [token,setToken]=useState("");
  const [cartItems,setCartItems]=useState({});
  const [food_list,setFoodList]=useState([]);
  
  // 🔹 Promo code states
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = async (itemId) => {
    try {
    // Update local state immediately
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId] : 1}));
    }
    else setCartItems((prev)=>({...prev,[itemId] : prev[itemId] + 1}));
    // 🔒 Send request to backend
    const res = await axios.post(`${url}/api/cart/add`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      console.error("Backend failed to add to cart:", res.data.message);
    }
  } 
  catch (err) {
    console.error("Error in addToCart:", err);
  }
};

const removeFromCart = async (itemId) => {
  try {
    if(cartItems[itemId]>0){
      setCartItems((prev)=>({...prev,[itemId] : prev[itemId] - 1}));
    }
    else setCartItems((prev)=>({...prev,[itemId] : 0}));
    // Update local state immediately
    // 🔒 Send request to backend
    const res = await axios.post(`${url}/api/cart/remove`,
      { itemId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.data.success) {
      console.error("Backend failed to remove from cart:", res.data.message);
    }
  } 
  catch (err) {
    console.error("Error in removeFromCart:", err);
  }
};



const loadCartData = async (storedToken) => {
  try {
    const res = await axios.post(
      `${url}/api/cart/get`,
      {},
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    if (res.data.success) {
      setCartItems(res.data.cartData);  // Save cart items in state
    }
  } 
  catch (err) {
    console.error("Error fetching cart:", err);
  }
};



useEffect(() => {
  const loadData = async () => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      await fetchFoodList();        // Fetch food first
      await loadCartData(storedToken); // Then load cart
    } 
    else {
      await fetchFoodList(); // For guest users
    }
  };

  loadData();
}, []);




  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
      let itemInfo=food_list.find((product)=>product._id===item);
      totalAmount+=itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const fetchFoodList=async()=>{
    const response=await axios.get(url+"/api/food/list");
    if(response.data.success){
     setFoodList(response.data.data);
    }
    else{
      console.log("Error");
    }
  }

  // 🔹 Apply promo code
  const applyPromoCode = (code) => {
    const formattedCode = code.toUpperCase();
    if (/^[A-Z0-9]{6}$/.test(formattedCode)) {
      if (!discountApplied) {
        setPromoCode(formattedCode);
        setDiscount(20); // ₹20 discount
        setDiscountApplied(true);
        return { success: true, message: "Promo applied! ₹20 discount given." };
      } else {
        return { success: false, message: "Promo already applied." };
      }
    } else {
      return { success: false, message: "Invalid promo code. Must be 6 letters/numbers." };
    }
  };

  const contextValue={
  food_list,
  cartItems,
  setCartItems,
  addToCart,
  removeFromCart,
  getTotalCartAmount,
  url,
  token,
  setToken,
  promoCode,
  discount,
  discountApplied,
  applyPromoCode,
  }

  return (
    <StoreContext.Provider value={contextValue}>
    {props.children}

    </StoreContext.Provider>

  )
}

export default StoreContextProvider;


