import React, { Component } from 'react';
import './Filter.scss'

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      category: []
  }
  };
  componentDidMount() {
    fetch("http://localhost:3001/api/product/categories/").then(res => res.json())
      .then(categories =>
        this.setState({ category: categories })
      )
  }

  render() {
    const category = this.state
    console.log(category)
    return (
      <div className="filter">
        <div className="filter-sort">Filter by price {" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option> latest </option>
            <option value='desc'>lowest</option>
            <option value='asc'>highest</option>
          </select>
        </div>
        <div className="filter-size">Filter categories{" "}
             <select value={this.props.size} onChange={this.props.filterProducts}>
               <option value="">All</option>
               <option value="vegetables">vegetables</option>
               <option value="grain">grain</option>
               <option value="meal">meal</option>
               <option value="lactose">lactose</option>
             </select>
        </div>
      </div>
    );
  }
}

export default Filter;