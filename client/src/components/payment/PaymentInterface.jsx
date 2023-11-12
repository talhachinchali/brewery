

import { useContext, useState,useEffect } from "react";

import axios from "axios";
import { Context } from "../../context/Context";

import { useLocation } from "react-router";


function PaymentInterface() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amt, setAmt] = useState(0);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const path = location.pathname.split("/")[2];
 
  
  const { user} = useContext(Context);


  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  console.log(title);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    console.log(`${cardNumber}`);
  };
  console.log(`${cardNumber}`);
  const handleAmtChange = (event) => {
    // Convert the value to a number using Number()
    setAmt(Number(event.target.value));
  };

  const handleExpiryChange = (event) => {
    setExpiry(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPayment = {
      username: user.username,
      stud_username:post.username,
      post_title:post.title,
      payment_details:amt,
      post_id:post._id,
    };

    try {
      console.log("Request URL:", axios.defaults.baseURL + "/auth/payment");
      const res = await axios.post("http://localhost:5000/api/auth/payment", newPayment);
      
      alert('Payment processed successfully!' + post.title);
      console.log(res);
          window.location.replace("/post/" + post._id);

    } catch (err) {
      console.log(err);
    }
    
  };
console.log(user.username);
console.log(post.username);
console.log(amt);
console.log(post._id);
  return (
    <div>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="amt">amount</label>
          <input
            type="number"
            id="amt"
            name="amt"
            value={amt}
            onChange={handleAmtChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiry">Expiry Date:</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={expiry}
            onChange={handleExpiryChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={handleCvvChange}
            required
          />
        </div>
        <button type="submit" style={{ backgroundColor: "blue", color: "white" }}>
  Pay Now
</button>

      </form>
    </div>
  );
  
}

export default PaymentInterface;
