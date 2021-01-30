import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SearchIcon from "@material-ui/icons/Search";

function SearchBox(props) {
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(props)
    props.history.push(`/search/name/${name}`);
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
      </div>
    </form>
  );
}

const mapStateToProps = () => {};

export default withRouter(connect(mapStateToProps)(SearchBox));
