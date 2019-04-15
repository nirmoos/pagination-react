import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./App.css";


class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [],
            currentPage: 1,
            totalPages: 1
        };
    }
    fetchDataFromServer = (pageNumber=1) => {
        axios.get("https://demo.ghost.io/ghost/api/v2/content/posts/", {
            params: {
                key: "22444f78447824223cefc48062",
                limit: 1,
                page: pageNumber
            }
        })
        .then(({data}) => {
            let users, meta, totalPages, currentPage;
            ({posts: users, meta} = data);
            ({pages: totalPages, page: currentPage} = meta.pagination);
            this.setState({
                data: users,
                totalPages: totalPages,
                currentPage: currentPage
            });
        });
    }
    componentDidMount () {
        this.fetchDataFromServer();
    }
    handlePageClick = ({selected}) => {
        this.fetchDataFromServer(selected + 1);
    }
    render () {
        return (
            <div className="app">
                <div className="paginate-wrapper">
                    <ReactPaginate
                        previousLabel={<i className="fa fa-chevron-left"></i>}
                        nextLabel={<i className="fa fa-chevron-right"></i>}
                        previousLinkClassName={"nav"}
                        nextLinkClassName={"nav"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageClassName={"page"}
                        disabledClassName={"disabled-page"}
                        pageCount={this.state.totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                    />
                </div>
            </div>
        );
    }
}

export default App;
