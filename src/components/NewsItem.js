import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className = "my-3">
       <div className="card" style={{width :"18rem"}}>
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div classNameName="card-body">
    <h5 className="card-title">{title} <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
    {source} </span> </h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} className="btn btn-primary">Read-more</a>
    <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {date}</small></p>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem

