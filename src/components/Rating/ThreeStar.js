import React from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ReactStars from "react-rating-stars-component";

export default function ThreeStar(props){
  console.log(props.aaa)
  return (
    <div>
      {/*<Rating
        value={props.value}
        max={3}
        className={props.className}
        onChange={props.onChange}
        name="unique-rating"
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />*/}
      <ReactStars
        count={3}
        value={props.value}
        onChange={(newRating) => {
          console.log(newRating)
        }}
        size={30}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  )
};