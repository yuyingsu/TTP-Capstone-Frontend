import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import { Button } from 'reactstrap';

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
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
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

  //console.log("product" + JSON.stringify(product))
    return (
      <div className="product-page">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
      <div className="product">
        <div className="photo-gallery">
          <img src={product.image} style={{height: "450px", width: "450px"}} alt="game pic" />
        </div>
        <div class="container">
          <div class="row">
          <div class="col-sm">
          <table style={{marginLeft:"100px", marginTop:"40px"}}>
            <tr>
            <td>
            <h1>
            {product.name}
            </h1>
            </td>
            </tr>
            <tr>
            <th>Brand</th>
            <td>{product.brand}</td>
            </tr>
            <tr>
            <th>Rating</th>
            <td>{product.rating}</td>
            </tr>
            <tr>
            <th>Number of reviews:</th>
            <td>{product.numReviews}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{product.description}</td>
            </tr>
          </table>
          </div>
          <div class="col-sm">
          <span className="cartbttn">
            <select onChange={(e)=>{setQty(e.target.value)}} style={{marginTop:"120px"}}>
            {[...Array(product.countInStock).keys()].slice(0,10).map(x =>
                <option key={x + 1} value={x + 1}>Qty: {x + 1}</option>
                      )}
            </select>
            <div>
            <Button type="button" onClick={handleAddToCart} style={{marginTop:"20px", marginLeft:"0px"}}>
              Add to Cart
            </Button>
            </div>
          </span>
          </div>
          </div>
          <div class="row">
          <div class="col">
          <div style={{marginTop:"0px", marginRight:"450px"}}>
          <div className="product-reviews" style={{marginLeft:"50px"}}>
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!product.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review._id}>
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
                <h3>Write a customer review</h3>
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
                        <Button type="submit" className="button primary">
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
          </div>
      )}
    </div>

    );
}

export default Product;
