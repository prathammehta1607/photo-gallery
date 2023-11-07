import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSelector, useDispatch } from "react-redux";
import * as photoReducer from "../../redux/photo/photo.reducer";
import * as photoAction from "../../redux/photo/photo.action";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import "./style.scss";
import Imagepopup from "../Imagepopup";
import Button from 'react-bootstrap/Button';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';




export default function Gallery({ dataProps }) {
  const [modalShow, setModalShow] = React.useState(false);

  let dispatch = useDispatch();
  let galleryData = useSelector((state) => {
    return state[photoReducer.searchPhotosFeatureKeys];
  });
  let { data } = galleryData;
  let { results } = data;
  const handleImageClick = (data) => {
    setModalShow(true)
    dispatch(photoAction.selectedData(data));
  };

  return (
    <React.Fragment>

      <Container className="mt-48">
        <Imagepopup
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {results &&
              results.map((data, index) => {
                return (
                  <div
                    style={{ padding: "10px" }}
                    key={index}
                    onClick={handleImageClick.bind(this, data)}
                  >
                    <Card className="pointer">
                      <Card.Img variant="top" src={data.urls.thumb} />

                      <Card.Body className="card-body-wrapper">
                        <div className="left-content">
                          <div className="author-image">
                            <img src={data.user.profile_image.small} alt="" />
                          </div>
                          <div className="author-details">
                            <div className="name">{data.user.name}</div>
                            <div className="username">
                              @{data.user.username}
                            </div>
                          </div>
                        </div>
                        <div className="right-content">
                          <div className="icon">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.36331 10.7042L6.17165 12.1042C6.40498 12.3375 6.92998 12.4542 7.27998 12.4542H9.49665C10.1966 12.4542 10.955 11.9292 11.13 11.2292L12.53 6.97084C12.8216 6.15417 12.2966 5.45417 11.4216 5.45417H9.08831C8.73831 5.45417 8.44664 5.16251 8.50498 4.75417L8.79665 2.88751C8.91331 2.36251 8.56331 1.77917 8.03831 1.60417C7.57164 1.42917 6.98831 1.66251 6.75498 2.01251L4.36331 5.57084"
                                stroke="#4F4F4F"
                                stroke-miterlimit="10"
                              />
                              <path
                                d="M1.38837 10.7042V4.9875C1.38837 4.17083 1.73837 3.87917 2.55503 3.87917H3.13837C3.95503 3.87917 4.30503 4.17083 4.30503 4.9875V10.7042C4.30503 11.5208 3.95503 11.8125 3.13837 11.8125H2.55503C1.73837 11.8125 1.38837 11.5208 1.38837 10.7042Z"
                                stroke="#4F4F4F"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div className="likes">
                            {
                              (data.likes >= 1000) ?
                                (data.likes / 1000).toFixed(1) : data.likes
                            }k

                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </Masonry>
        </ResponsiveMasonry>
      </Container>
    </React.Fragment>
  );
}






