import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { EDIT_PRODUCT, GET_PRODUCT } from '../../HTTPServer/httpProduct.js';
import "./UpdateProduct.css";
import { GET_ALL_CATEGORIES} from '../../HTTPServer/httpCategory.js';

export default class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            productId: 0,
            name: "",
            description: "",
            ingredient: "",
            categoryId: 0,
            featured: false,
            price: "",
            saleOff: "",
            stock: "",
            sold: "",
            images: "",
            createDate: "",
            updatedTime: "",
            redirect: false
        }
    }
    

    componentDidMount() {
        GET_PRODUCT('Get', this.props.match.params.id)
            .then(product => {
                this.setState({ productId: product.data.id });
                this.setState({ name: product.data.name});
                this.setState({ description: product.data.description});
                this.setState({ ingredient: product.data.ingredient});
                this.setState({ categoryId: product.data.category.id});
                this.setState({ featured: product.data.featured});
                this.setState({ price: product.data.price.toString()});
                this.setState({ saleOff: product.data.saleOff});
                this.setState({ stock: product.data.stock});
                this.setState({ sold: product.data.sold});
                this.setState({ images: product.data.images});
                this.setState({ createDate: product.data.createDate});
            });

        GET_ALL_CATEGORIES('Get')
            .then(response => {
                this.setState({ categoryList: response.data });
            });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const product = {
            name: e.target.name.value,
            description: this.n2rn(e.target.description.value),
            ingredient: this.n2rn(e.target.ingredient.value),
            categoryId: e.target.categoryId.value,
            featured: e.target.featured.checked,
            price: e.target.price.value,
            saleOff: e.target.saleOff.value,
            stock: e.target.stock.value,
            sold: e.target.sold.value,
            images: e.target.images.value,
            createDate: this.state.createDate,
            updatedTime: this.toISOLocal(new Date()),
        }

        if (product.categoryId === "0") {
            alert("Bạn chưa chọn [Category]")
        }
        else {
            EDIT_PRODUCT(`Edit/${this.state.productId}`, product)
                .then(response => {
                    console.log(product);
                    if (response.data === 1) {
                        alert("Cập nhật sản phẩm thành công");
                        this.setState({redirect: true});
                    } else {
                        alert("Có lỗi xảy ra, vui lòng thử lại sau");
                    }
                });
        }
    }

    n2rn(str) {
        return (str).replaceAll('\n', '\r\n');
    }

    toISOLocal(d) {
        var z = n => ('0' + n).slice(-2);
        var zz = n => ('00' + n).slice(-3);
        var off = d.getTimezoneOffset();
        var sign = off < 0 ? '+' : '-';
        off = Math.abs(off);

        return d.getFullYear() + '-'
            + z(d.getMonth() + 1) + '-' +
            z(d.getDate()) + 'T' +
            z(d.getHours()) + ':' +
            z(d.getMinutes()) + ':' +
            z(d.getSeconds()) + '.' +
            zz(d.getMilliseconds()) +
            sign + z(off / 60 | 0) + ':' + z(off % 60);
    }

    handleChangePrice() {
        const price = parseInt(document.querySelector(".product-price__input").value);
        const discount = parseInt(document.querySelector(".product-discount__input--edit").value);

        if(discount > 100 || discount < 0) {
            document.querySelector(".product-discount__input--edit").value = "0";
            document.querySelector(".product-new-price__input").value = price.toString();
            alert("Discount phải trong khoảng [0,100]");
        } else {
            const result = price * (100 - discount) / 100;
            document.querySelector(".product-new-price__input").value = result.toString();
        }
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
                            name="name" defaultValue={this.state.name}/>
                    </div>
                    <div className="product-description">
                        <p className="product-description__title">Description</p>
                        <textarea className="product-description__input" type="text" rows="5" required
                            name="description" defaultValue={this.state.description}>
                        </textarea>
                    </div>
                    <div className="product-ingredient">
                        <p className="product-ingredient__title">Ingredient</p>
                        <textarea className="product-ingredient__input" type="text" rows="5" required
                            name="ingredient" defaultValue={this.state.ingredient}>
                        </textarea>
                    </div>
                    <div className="product-categories">
                        <p className="product-categories__title">Category</p>
                        <select className="product-categories__select" 
                            name="categoryId">
                            <option value="0">--Select Category--</option>
                            {
                                this.state.categoryList.map((option) => (
                                    option.id === this.state.categoryId
                                    ? <option key={option.id} value={option.id} selected="selected">{option.name}</option>
                                    : <option key={option.id} value={option.id}>{option.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="product-featured">
                        <p className="product-featured__title">Featured</p>
                            {
                                this.state.featured
                                ? <input  className="product-featured__input" type="checkbox" autoComplete="off" name="featured" defaultChecked/>
                                : <input  className="product-featured__input" type="checkbox" autoComplete="off" name="featured"/>
                            }
                    </div>
                </div>
                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="fas fa-dollar-sign admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Price</p>
                    </div>
                    <div className="product-price">
                        <p className="product-price__title">Price (VND)</p>
                        <input onChange={() => this.handleChangePrice()} className="product-price__input" 
                            type="text" pattern="[0-9]*" autoComplete="off" 
                            name="price" defaultValue={this.state.price}/>
                    </div>
                    <div className="product-discount">
                        <p className="product-discount__title">Discount</p>
                        <input onChange={() => this.handleChangePrice()} className="product-discount__input--edit" 
                            type="text" pattern="[0-9]*" autoComplete="off" maxLength="3"
                            name="saleOff" defaultValue={this.state.saleOff}/>
                    </div>
                    <div className="product-new-price">
                        <p className="product-new-price__title">New Price</p>
                        <input className="product-new-price__input" type="text" readOnly
                            value={parseInt(this.state.price)*(100-parseInt(this.state.saleOff))/100}/>
                    </div>
                </div>
                <div className="admin__add-new-data">
                    <div className="admin__add-new-data--heading">
                        <i className="fas fa-warehouse admin__add-new-data--icon"></i>
                        <p className="product__add-new-data--title">Inventory</p>
                    </div>
                    <div className="product-stock">
                        <p className="product-stock__title">Stock</p>
                        <input type="text" pattern="[0-9]*" className="product-stock__input" autoComplete="off"
                            name="stock" defaultValue={this.state.stock}/>
                    </div>
                    <div className="product-sold">
                        <p className="product-sold__title">Sold</p>
                        <input className="product-sold__input" type="text" readOnly autoComplete="off"
                            name="sold" defaultValue={this.state.sold}/>
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
                            name="images" defaultValue={this.state.images} />
                    </div>
                </div>
            </form>
        )
    }
}
