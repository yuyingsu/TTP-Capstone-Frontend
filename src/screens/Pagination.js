import React, { Component } from 'react';
import { Pagination, PaginationItem } from 'reactstrap';

class Pagination extends Component {
  goToFirst = () => {
    this.props.setPage(1);
  }
  goToLast = () => {
    this.props.setPage(this.props.maxPage);
  }
  goBack = () => {
    if (this.props.page > 1) {
      this.props.setPage(this.props.page - 1);
    }
  }
  moveForward = () => {
    if (this.props.page < this.props.maxPage) {
      this.props.setPage(this.props.page + 1);
    }
  }
  goToPage = (num) =>{
    this.props.setPage(num);
  }

  render() {
    let array = new Array(3);
    if (this.props.page % 3 == 1) {
      array=[this.props.page, this.props.page + 1, this.props.page + 2];
    }else if (this.props.page % 3 == 2) {
      array=[this.props.page - 1, this.props.page, this.props.page + 1];
    } else {
      array=[this.props.page - 2, this.props.page - 1, this.props.page];
    }
    const pages = array.map((num)=> (
      <PaginationItem>
        <button onClick={()=>{this.goToPage(num)}}>{num}</button>
      </PaginationItem>
    ));

    return (
      <div>
        <Pagination className="pagination" aria-label="Page navigation example">
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

export default Pagination;
