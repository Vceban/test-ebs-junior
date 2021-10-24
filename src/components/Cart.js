import React, { Component } from 'react';
import './Cart.scss'

class Cart extends Component {
  render() {
    const {cartItems} = this.props;
    console.log(cartItems)
    return (
      <div>
        {cartItems.length === 0? (
          <div className="cart cart-header">Cart is emty</div>)
        :
          (
        <div className="cart cart-header"> you have {cartItems.length} in cart</div>
          )}
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) =>(
              <li key={item.id}>
                <div>{item.name}</div>
                <div className="remove">
                  {item.price + "$"} x {item.count} {" "}
                <button className="button" onClick={()=> this.props.removeFromCart(item)}>
                  Remove
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length!==0 && (
          <div className="cart">
            <div className="total">
              Total:{" "}$
              {cartItems.reduce((a,c)=> a + c.price * c.count, 0)}
            </div>
            <button className="primary">Proceed</button>
          </div>
        )}
      </div>
    );
  }
}

export default Cart;