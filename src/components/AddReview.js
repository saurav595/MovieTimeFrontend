import React, { useState } from 'react';
import MovieDataService from "../services/movies";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


const AddReview = ({user}) => {
    const navigate = useNavigate();
    
    let params = useParams();

    let editing = false;
    let initialReviewState = "";

    const location = useLocation();

    if (location.state) {
        editing = true;
    }

    const [review, setReview] = useState(initialReviewState);

    const onChangeReview = e => {
        const review = e.target.value;
        setReview(review);
    }

    const saveReview = () => {
        
        if (editing) {
            var editData = {
                review_id: location.state.currentReview._id,
                user_id: user.googleId,
                review: review,
                name: user.name
            }
        } else {
            var data = {
                review: review,
                name: user.name,
                user_id: user.googleId,
                movie_id: params.id
            }
        }

        
        if (editing) {
            
            MovieDataService.editReview(editData)
            .then(response => {
                navigate(("/movies/"+params.id))
            })
            .catch(e => {
                console.log(e)
            })
        } else {
            MovieDataService.createReview(data)
            .then(response => {
                navigate("/movies/" + params.id)
            })
            .catch(e => {
                console.log(e);
            });
        }
        
    }
    

    return (
        <Container className="main-container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label> {editing ? "Edit" : "Create" } Review </Form.Label>
                    <Form.Control
                    as="textarea"
                    type="text"
                    required
                    review={review}
                    onChange={ onChangeReview }
                    defaultValue={ editing ? null : ""}
                    />
                </Form.Group>
                <Button variant="primary" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview;