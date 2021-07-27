import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { ADD_PRODUCT } from '../../HTTPServer/httpProduct.js';
import "./AddProduct.css";
import { GET_ALL_CATEGORIES} from '../../HTTPServer/httpCategory.js';

export default class AddProduct extends Component {
    state = {
        categoryList: []
    };

    componentDidMount() {
        GET_ALL_CATEGORIES('Get')
            .then(response => {
                this.setState({ categoryList: response.data });
            });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const product = {
            name: e.target.name.value,
            description: e.target.description.value,
            ingredient: e.target.ingredient.value,
            categoryId: e.target.categoryId.value,
            featured: e.target.featured.checked,
            price: e.target.price.value,
            saleOff: e.target.saleOff.value,
            stock: e.target.stock.value,
            sold: e.target.sold.value,
            images: e.target.images.value,
            createDate: new Date(),
            updatedTime: new Date(),
        }

        if (product.categoryId === "0") {
            alert("Bạn chưa chọn [Category]")
        }
        else {
            ADD_PRODUCT('Create', product)
                .then(response => {
                    console.log(product);
                    if(response.data == 1) {
                        alert("Thêm sản phẩm mới thành công");
                    } else {
                        alert("Có lỗi xảy ra, vui lòng thử lại sau");
                    }
                });
            //return <Link to="/product" />
        }
    }

    

    handleChangePrice() {
        const price = document.querySelector(".product-price__input").value;
        const discount = document.querySelector(".product-discount__input").value;

        const result = price*(100 - discount)/100;
        console.log(result);

        document.querySelector(".product-new-price__input").value = result.toString();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleFormSubmit(e)}>
                <div className="admin__heading">
                    <h1 className="admin__add-new-title">PRODUCT</h1>
                    <button className="btn btn--primary admin__add-new-button">
                        <i className="far fa-save btn--save-icon"></i>
                        Save
                    </button>
                </div>

                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="fas fa-info admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Product info</p>
                    </div>
                    <div className="product-name">
                        <div className="product-name__title">Name</div>
                        <input className="product-name__input" type="text" required autoComplete="off"
                            name="name" defaultValue="Phan nuoc"/>
                    </div>
                    <div className="product-description">
                        <p className="product-description__title">Description</p>
                        <textarea className="product-description__input" type="text" rows="5" required
                            name="description" defaultValue="Haha\r\nHáhá\r\nHàhà">
                        </textarea>
                    </div>
                    <div className="product-ingredient">
                        <p className="product-ingredient__title">Ingredient</p>
                        <textarea className="product-ingredient__input" type="text" rows="5" required
                            name="ingredient" defaultValue="Haha\r\nHáhá\r\nHàhà">
                        </textarea>
                    </div>
                    <div className="product-categories">
                        <p className="product-categories__title">Category</p>
                        <select className="product-categories__select" 
                            name="categoryId">
                            <option value="0">--Select Category--</option>
                            {
                                this.state.categoryList.map((option) => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="product-featured">
                        <p className="product-featured__title">Featured</p>
                        <input className="product-featured__input" type="checkbox" autoComplete="off"
                            name="featured"/>
                    </div>
                </div>
                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="fas fa-dollar-sign admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Price</p>
                    </div>
                    <div className="product-price">
                        <p className="product-price__title">Price (VND)</p>
                        <input onChange={() => this.handleChangePrice()} className="product-price__input" type="number" min="1000" defaultValue="1000" autoComplete="off"
                            name="price"/>
                    </div>
                    <div className="product-discount">
                        <p className="product-discount__title">Discount</p>
                        <input onChange={() => this.handleChangePrice()} className="product-discount__input" type="number" min="0" max="100" defaultValue="0" autoComplete="off"
                            name="saleOff"/>
                    </div>
                    <div className="product-new-price">
                        <p className="product-new-price__title">New Price</p>
                        <input className="product-new-price__input" type="text" defaultValue="1000" readOnly/>
                    </div>
                </div>
                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="fas fa-warehouse admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Inventory</p>
                    </div>
                    <div className="product-store">
                        <p className="product-store__title">Stock</p>
                        <input type="number" className="product-store__input" min="0" defaultValue="0" autoComplete="off"
                            name="stock"/>
                    </div>
                    <div className="product-sold">
                        <p className="product-sold__title">Sold</p>
                        <input className="product-sold__input" type="text" defaultValue="0" readOnly autoComplete="off"
                            name="sold"/>
                    </div>
                </div>
                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="far fa-images admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Pictures</p>
                    </div>
                    <div className="product-picture">
                        <p className="product-picture__title">Picture</p>
                        <input type="text" className="product-picture__input" required autoComplete="off"
                            name="images" defaultValue="https://cf.shopee.vn/file/1d0cb4e6d6d7f787b60473e002d92655"/>
                    </div>
                </div>
            </form>
        )
    }
}
