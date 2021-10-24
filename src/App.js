import React, { Component } from 'react';
import './App.scss'
import Filter from './components/Filter';
import Cart from './components/Cart'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      cartItems:[],
      size: "",
      sort: ""
    };
  }
  removeFromCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x.id !== product.id)
    })
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item.id === product.id){
        //cartItems.length++;
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count : 1})
    }
    this.setState({cartItems})
  }
  sortProducts = (event) => {
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products : this.state.products
        .sort((a,b) =>
            sort === "desc"?
            ((a.price > b.price)? 1:-1):
            sort === "asc"?
            ((a.price < b.price)? 1:-1):
            ((a.id < b.id)? 1: -1)
        ),
    })
  }
  filterProducts = (event) => {
  };

  componentDidMount() {
    fetch("http://localhost:3001/api/products/").then(res => res.json())
      .then(data =>
        this.setState({ products: data })
        )
    fetch("http://localhost:3001/api/product/categories/").then(res => res.json())
      .then(categories =>
        this.setState({ category: categories })
      )
  }

  render(){
    const data = this.state;

    console.log(this.state)
    return(
      <div className="container">
        <Filter count={this.state.products.length}
        size={this.state.size}
        sort={this.state.sort}
        filterProducts={this.filterProducts}
        sortProducts={this.sortProducts}>

        </Filter>
        <table className="main">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Add to cart</th>
          </tr>
        </thead>
        <tbody>
        {data.products.map(item =>
        <tr key={item.id}>
          <th>{item.name}</th>
          <th>{item.price} $</th>
          <th>
            <button onClick={() => this.addToCart(item)}>
              Add to Cart
              <i className="fas fa-shopping-cart"></i>
            </button>
          </th>
        </tr>)}
        </tbody>
      </table>
        <div className="sidebar">
          <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart}/>
        </div>
      </div>
    )
  }
}
export default App