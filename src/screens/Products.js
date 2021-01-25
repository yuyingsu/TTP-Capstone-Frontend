import React, {Component} from 'react';
import { connect } from 'react-redux';
import { nextPage,fetchAllProduct } from '../actions/productActions';
import CardProduct from '../components/CardProduct';
import { Container, Row, Col } from 'reactstrap';
import { Pagination, PaginationItem } from 'reactstrap';

class Product extends Component {
    state = {
        page:1,
        maxPage:Math.ceil(this.props.products.length/3)
    }
    componentDidMount() {
        this.props.nextPage(this.state.page);
        this.props.fetchAllProduct();
    }
    componentDidUpdate(prevState){
        if (this.state.page !== prevState.page) {
            this.props.nextPage(this.state.page);
          }
    }
    goToFirst = () =>{
        this.setState({page:1});
    }
    goToLast = () =>{
        this.setState({page: this.state.maxPage});
    }
    goBack = () =>{
        if(this.state.page>1){
            this.setState({page:this.state.page-1});
        }
    }
    moveForward = () =>{
        if(this.state.page<this.state.maxPage){
            this.setState({page:this.state.page+1});
        }
    }
    goToPage = (num) =>{
        this.setState({page:num});
    }
    render() {
    const res=this.props.pds.map((product) => (
        <span>
        <Col xs="12" s="6" m="3" l="3" xl="3">
        <CardProduct price={product.price} countInStock={product.countInStock}
        rating={product.rating} numReviews={product.numReviews} id={product._id}
        name={product.name} image={product.image} brand={product.brand}
        category={product.category} description={product.description}
        reviews={product.reviews} key={product._id}/>
        </Col>
        </span>));
    let array = new Array(3);
    if(this.state.page % 3 == 1){
        array=[this.state.page, this.state.page+1, this.state.page+2];
    }else if(this.state.page % 3 == 2){
        array=[this.state.page-1, this.state.page, this.state.page+1];
    }else{
        array=[this.state.page-2, this.state.page-1, this.state.page];
    }
    const pages = array.map((num)=>(
        <PaginationItem>
        <button onClick={()=>{this.goToPage(num)}}>{num}</button>
        </PaginationItem>
    ));
    return (
        <div>
            <h1>Products</h1>
            <Container>
            <Row className="no-gutters">
            {res}
            </Row>
            </Container>
            <Pagination aria-label="Page navigation example">
            <PaginationItem>
            <button onClick={this.goToFirst}>First</button>
            </PaginationItem>
            <PaginationItem>
            <button onClick={this.goBack}>Previous</button>
            </PaginationItem>
            {pages}
            <PaginationItem>
            <button onClick={this.moveForward}>Next</button>
            </PaginationItem>
            <PaginationItem>
            <button onClick={this.goToLast}>Last</button>
            </PaginationItem>
            </Pagination>
        </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        pds: state.pds.productPage,
        products: state.pds.products
    }
};

const mapDispatchToProps = dispatch => {
    return {
        nextPage: (page) => dispatch(nextPage(page)),
        fetchAllProduct: ()=> dispatch(fetchAllProduct())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
