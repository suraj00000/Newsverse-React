import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';


export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      loading:true
    }
  }

  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general'
  }
  
  static propTypes={
    country:PropTypes.string,
    page:PropTypes.number,
    category:PropTypes.string
  

  }

  async componentDidMount() {
    console.log(this.props.category);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=1&pageSize=${this.props.pageSize}`;    
    this.setState({loading:true});
    let data = await fetch(url);
    let pasrsedData = await data.json();
    this.setState({ articles: pasrsedData.articles, totalResults: pasrsedData.totalResults,loading:false })
  }

  handlePreviouseClick = async () => {
    console.log('Previous');
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let pasrsedData = await data.json();
    this.setState({
      articles: pasrsedData.articles,
      page: this.state.page - 1,
      loading:false 
    });
  }
  handleNextClick = async () => {
    console.log("nexttt");
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {      
      console.log("next");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let pasrsedData = await data.json();
      // console.log(pasrsedData);
      this.setState({ articles: pasrsedData.articles, page: this.state.page + 1,loading:false })
    }
  }



  render() {
    return <div className='container my-3'>
      <h2 className='text-center'>Top Headlines</h2>
      {this.state.loading && <Spinner/>}
      <div className="row">
        {!this.state.loading && this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
          </div>
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviouseClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" id='btn' onClick={this.handleNextClick}>Next &rarr;</button>
      </div>

    </div>;
  }
}

export default News;
