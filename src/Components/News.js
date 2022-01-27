import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1
    }
  }

  async componentDidMount() {
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=1&page=1pageSize=20";
    let data = await fetch(url);
    let pasrsedData = await data.json();
    this.setState({ articles: pasrsedData.articles, totalResults: pasrsedData.totalResults })
  }

  handlePreviouseClick = async () => {
    console.log('Previous');
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let pasrsedData = await data.json();
    this.setState({
      articles: pasrsedData.articles,
      page: this.state.page - 1
    });
  }
  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
     console.log("End!!!!!!!!!!!!!!!");
    } else {
      console.log('next');
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=ffaf0e05bdd143ce8a9b76014d4a3c6d&page=${this.state.page + 1}&pageSize=20`;
      let data = await fetch(url);
      let pasrsedData = await data.json();
      // console.log(pasrsedData);
      this.setState({ articles: pasrsedData.articles, page: this.state.page + 1 })
    }
  }



  render() {
    return <div className='container my-3'>
      <h2>Top HeadLines</h2>

      <div className="row">
        {this.state.articles.map((element) => {
          return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
          </div>
        })}
      </div>
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviouseClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" id='btn' onClick={this.handleNextClick}>Next &rarr;</button>
      </div>

    </div>;
  }
}

export default News;
