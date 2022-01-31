import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;

  return (
    <div className='my-3 '>
      <div className="card" style={{ width: "18rem" }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-secondary">
            {source}
          </span>
        </div>
        <img src={imageUrl?imageUrl:"data:image/jpeg;base64,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"} className="card-img-top" alt="/" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>

        </div>
      </div></div>);
}

export default NewsItem;
