import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { Button } from 'reactstrap';
import { Spinners } from '../components'

function Product(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  return (
    <div className="product-page">
    {loading ? (
      <Spinners status="loading" />
    ) : error ? (
      <div>{error} </div>
    ) : (
        <div className="product">
        <div className="container">
        <div className="row">
        <div className="col-sm">
        <div className="photo-gallery">
        <img src={product.image} style={{height: "450px", width: "450px"}} alt="game pic" />
        </div>
        </div>
        <div className="col-sm">
        <table style={{marginLeft:"100px", marginBottom:"200px", font: "1.2em Fira Sans, sans-serif"}}>
          <caption><h3 style={{marginLeft:"5px"}}>{product.name}</h3></caption>
          <tr>
          <th>Brand</th>
          <td>{product.brand}</td>
          </tr>
          <tr>
          <th>Rating</th>
          <td><Rating value={product.rating} /></td>
          </tr>
          <tr>
          <th>Reviews</th>
          <td>{product.numReviews}</td>
          </tr>
          <th>Price</th>
          <td>${product.price}</td>
        </table>
        </div>
        <div className="col-sm">
        <div className="cartbttn" style={{marginLeft:"100px", marginBottom:"200px"}}>
          <select onChange={(e)=>{setQty(e.target.value)}}>
          {[...Array(product.countInStock).keys()].slice(0,10).map(x =>
            <option key={x + 1} value={x + 1}>Qty: {x + 1}</option>
          )}
          </select>
          <div>
          <Button type="button" onClick={handleAddToCart} style={{marginTop:"20px", marginLeft:"0px"}}>
            Add to Cart
          </Button>
          </div>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col">
          <div style={{ marginTop:"100px",marginLeft:"20px" }} className="game-description">
          <h4>Description: </h4>
          <div style={{marginTop:"20px"}}>{product.description}</div>
          </div>
        </div>
        </div>
        <div className="row">
        <div className="col">
        <div className="content-margined" style={{marginTop:"100px"}}>
          <h4 style={{textAlign:"left", marginLeft:"20px"}}>Reviews</h4>
          {!product.reviews.length && <div>There is no review</div>}
          <ul className="review" id="reviews">
            {product.reviews.map((review) => (
              <li key={review._id} style={{textAlign:"left"}}>
                <div>{review.name}</div>
                <div>
                  {console.log(JSON.stringify(review))}
                  <Rating value={review.rating}></Rating>
                </div>
                <div>{review.createdAt.substring(0, 10)}</div>
                <div>{review.comment}</div>
              </li>
            ))}
            <li>
              <h4 style={{marginTop:"100px"}}>Write a customer review</h4>
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <ul className="form-container">
                    <li>
                      <label htmlFor="rating">Rating</label><br/>
                      <select
                        name="rating"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </li>
                    <li>
                      <label htmlFor="comment">Comment</label><br/>
                      <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </li>
                    <li>
                      <Button type="submit" className="button primary mb-4">
                        Submit
                      </Button>
                    </li>
                  </ul>
                </form>
              ) : (
                <div>
                  Please <Link to="/signin">Sign In</Link> to write a review.
                </div>
              )}
            </li>
          </ul>
        </div>
        </div>
        </div>
        </div>
        </div>
    )}
    </div>
  );
}

export default Product;
