import React, { Component } from 'react';
import { Button, Pagination, PaginationItem } from 'reactstrap';

class Paginations extends Component {
  goToFirst = () => {
      this.props.setPage(1);
  }
  goToLast = () => {
    this.props.setPage(this.props.length);
  }
  goBack = () =>{
    if (this.props.page > 1) {
      this.props.setPage(this.props.page - 1);
      }
    }
  moveForward = () => {
    if (this.props.page < this.props.length) {
      this.props.setPage(this.props.page + 1);
    }
  }
  goToPage = (num) => {
    this.props.setPage(num);
  }

  render() {
    let array = new Array(3);
    if (this.props.page % 3 == 1) {
      if (this.props.page == this.props.length) {
        array=[this.props.page];
      } else {
        array=[this.props.page, this.props.page + 1, this.props.page + 2];
      }
    } else if (this.props.page % 3 == 2) {
      if (this.props.page == this.props.length){
        array=[this.props.page - 1, this.props.page];
      } else {
        array=[this.props.page - 1, this.props.page, this.props.page + 1];
        }
    } else {
      array=[this.props.page - 2, this.props.page - 1, this.props.page];
    }
    const pages = array.map((num) => (
      <PaginationItem>
        <Button onClick={()=>{this.goToPage(num)}}>{num}</Button>
      </PaginationItem>
    ));

    return (
      <div>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <Button onClick={this.goToFirst}>{"<<"}</Button>
          </PaginationItem>
          <PaginationItem>
            <Button onClick={this.goBack}>{"<"}</Button>
          </PaginationItem>
            {pages}
          <PaginationItem>
            <Button onClick={this.moveForward}>{">"}</Button>
          </PaginationItem>
          <PaginationItem>
            <Button onClick={this.goToLast}>{">>"}</Button>
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Paginations;
