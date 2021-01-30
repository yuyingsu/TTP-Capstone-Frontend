import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from 'react';
function SearchBox(props) {
  const [name, setName] = useState('');
  const [order, setOrder] = useState('');
  
  useEffect(() => {
    if(order){
      props.history.push(`/search/name/${name}?sortOrder=${order}`);
    }
    }, [order]);

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(props)
    if(name){
    props.history.push(`/search/name/${name}?sortOrder=${order}`);
    }
    //props.submitSearchTerm(name);
  };

  return (
    <form
      className="header__search"
      onSubmit={submitHandler}
    >
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        />
         <SearchIcon onClick={submitHandler}className="header__searchIcon" />
         Sort By{' '}
          <select name="sortOrder" style={{marginRight:"20px"}} onChange={(e)=>
            {setOrder(e.target.value)}}>
            <option value="newest">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
      </div>
    </form>
  );
}

const mapStateToProps = () => {};

export default withRouter(connect(mapStateToProps)(SearchBox));
