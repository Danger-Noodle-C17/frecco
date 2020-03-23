import React from 'react';
import { Button } from '@material-ui/core';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function FeedItem(props) {
  console.log('post # ' + props.id + ' isLiked? ' + props.isLiked + ' ' + props.likes + 'times');
  let heartIcon;
  if (props.isLiked === false) heartIcon = <AiOutlineHeart onClick={(event) => props.handleLikeReview(event, props.id, props.isLiked)} style={{ cursor: 'pointer' }}/>
  else heartIcon = <AiFillHeart onClick={(event) => props.handleLikeReview(event, props.id, props.isLiked)} style={{ cursor: 'pointer' }}/>
  return (

        <div className='feed-item'>
<<<<<<< HEAD

=======
>>>>>>> dev
            <div className='feed-item-top-container'>
                 <span className='feed-item-prop'> <span className='bold'>{`${props.locationDetail}, `}</span>{props.location}</span>
                 <span className='feed-item-prop'> Category: {props.category} </span>
            </div>
            <strong>{props.recommendation}</strong> 
            <div className='feed-item-top-container'>
                <span className='feed-item-prop'> Reviewed by: {props.username} </span>
                <span className='feed-item-prop'> Rating: {props.rating} </span>
            </div>
            <div className = 'review-text-box'>
                {props.review_text}
            </div>
            {heartIcon}  {props.likes} likes
        </div>
    )

}


export default FeedItem;