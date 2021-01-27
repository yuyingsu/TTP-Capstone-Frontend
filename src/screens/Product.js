import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.css'
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

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
      <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
      <div className="product">
        <div className="title">
          <h1>
            {product.name}
            <span>1st Edition</span>
          </h1>
        </div>
        <div className="subtitle">
          <h2 style={{ textAlign: "left", paddingLeft: "0.5em" }}>
            {"Developed by " /*this.state.details.developer*/}
          </h2>
        </div>
        <div className="photo-gallery">
          <img src={product.image} style={{height: "500px", width: "500px"}} alt="game pic" />
        </div>
        <div className="product-table">
          <table>
            <tr>
              <th>Developer</th>
              <th>{/*this.state.details.developer*/}</th>
            </tr>
            <th>Rating</th>
            <th>{product.rating}</th>
            <tr>
              <th>Platform(s)</th>
              <th>{/*this.state.details.platform*/}</th>
            </tr>
            <tr>
              <th>Release</th>
              <th>{/*this.state.details.release*/}</th>
            </tr>
            <tr>
              <th>Price</th>
              <th>{product.price}</th>
            </tr>
          </table>
        </div>
        <div className="cartbttn">
          <div>
            <button type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <select onChange={(e)=>{setQty(e.target.value)}}>
            {[...Array(product.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
            </select>
          </div>
        </div>
        <div className="game-description">
          <div>
            <h1>Game Description</h1>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="product-reviews">
        <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                  </a>
        </div>
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
                        <label htmlFor="rating">Rating</label>
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
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
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
          </>

      )}
    </div>

    );
}

export default Product;

