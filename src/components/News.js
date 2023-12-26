import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export default class News extends Component {
    constructor(props){  
    super(props);
    console.log("I am a constructor.....");
    this.state={
      articles : [ ],
      loading: false,
      page:1
    }
    document.title=`${this.props.category}-Stranger news`;
  }
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=679df7d8f9884800a2facd86f203ab8a&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading:false});
  }
  handleNextChange = async ()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=679df7d8f9884800a2facd86f203ab8a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles:parsedData.articles,
        page:this.state.page + 1, loading:false});
  }
  handlePrevChange = async ()=>{
    let url =  `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=679df7d8f9884800a2facd86f203ab8a&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles:parsedData.articles,
    page:this.state.page - 1, loading:false});
  }

  render() {
    return (
      <div className= "container my-3">
        <h3 className= "text-center">Top News Headlines from {this.props.category} category are:-</h3>
        <div className="text-center">
         {this.state.loading && <Spinner />}
        </div>
        <div className ="row" >
          {!this.state.loading && this.state.articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description = {element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
           </div>
           
          })}
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
        <button type="button" class="btn btn-primary" disabled={this.state.page<=1} onClick={this.handlePrevChange}>Previous</button>
        <button type="button" class="btn btn-danger" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize) } onClick={this.handleNextChange}>Next</button>
      </div>
    );
  }
}
