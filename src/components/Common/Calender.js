import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";
import DeleteModal from "./DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Calender = props => {

  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const event = [
    {
        title: 'New Year\'s Day',
      start: '2024-01-01',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Pongal',
      start: '2024-01-15',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Republic Day',
      start: '2024-01-26',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Telugu New Year',
      start: '2024-04-09',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Ramzan',
      start: '2024-04-11',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Tamil New Year',
      start: '2024-04-14',
      allDay: true, 
      className: 'holiday-event'
    }, {
        title: 'May Day',
      start: '2024-05-01',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Bakrid',
      start: '2024-06-17',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Rath Yatra',
      start: '2024-07-07',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Muharram',
      start: '2024-07-17',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Independance Day',
      start: '2024-08-15',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Onam',
      start: '2024-09-15',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Milad-Un-Nabi',
      start: '2024-09-16',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Gandhi Jayanti',
      start: '2024-10-02',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Diwali',
      start: '2024-10-31',
      allDay: true, 
      className: 'holiday-event'
    },
    {
        title: 'Christmas',
      start: '2024-12-25',
      allDay: true, 
      className: 'holiday-event'
    },
  ]
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [modalcategory, setModalcategory] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const toggle = () => {
    if (modalcategory) {
      setModalcategory(false);
      setEvent(null);
      setIsEdit(false);
    } else {
      setModalcategory(true);
    }
  };

  /**
   * Handling date click on calendar
   */
  const handleDateClick = arg => {
    const date = arg["date"];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(
      year,
      month,
      day,
      currentHour,
      currentMin,
      currentSec
    );
    const modifiedData = { ...arg, date: modifiedDate };

    setSelectedDay(modifiedData);
    toggle();
  };

  /**
   * Handling click on event on calendar
   */
  const handleEventClick = arg => {
    const event = arg.event;
    setEvent({
      id: event.id,
      title: event.title,
      title_category: event.title_category,
      start: event.start,
      className: event.classNames,
      category: event.classNames[0],
      event_category: event.classNames[0],
    });
    setDeleteId(event.id)
    setIsEdit(true);
    setModalcategory(true)
    toggle();
  };

  /**
    * On delete event
  */
  const handleDeleteEvent = () => {
    if (deleteId) {
      dispatch(onDeleteEvent(deleteId));
    }
    setDeleteModal(false);
  };

  /**
   * On category darg event
   */
  const onDrag = event => {
    event.preventDefault();
  };

  /**
   * On calendar drop event
   */
  const onDrop = event => {
    const date = event['date'];
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const currectDate = new Date();
    const currentHour = currectDate.getHours();
    const currentMin = currectDate.getMinutes();
    const currentSec = currectDate.getSeconds();
    const modifiedDate = new Date(year, month, day, currentHour, currentMin, currentSec);

    const draggedEl = event.draggedEl;
    const draggedElclass = draggedEl.className;
    if (draggedEl.classList.contains('external-event') && draggedElclass.indexOf("fc-event-draggable") == -1) {
      const modifiedData = {
        id: Math.floor(Math.random() * 100),
        title: draggedEl.innerText,
        start: modifiedDate,
        className: draggedEl.className,
      };
      dispatch(onAddNewEvent(modifiedData));
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteEvent}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="">
        <Container fluid={true} className="pt-0">
          <Row>
            <Col className="col-12">
              <Row >
                <Col xl={12} >
                  <Card >
                    <CardBody className="h-75">
                      <FullCalendar
                        plugins={[
                          BootstrapTheme,
                          dayGridPlugin,
                          listPlugin,
                          interactionPlugin,
                        ]}
                        slotDuration={"00:15:00"}
                        handleWindowResize={true}
                        themeSystem="bootstrap"
                        headerToolbar={{
                          left: "prev,next today",
                          center: "title",
                          right: "dayGridMonth,dayGridWeek,dayGridDay",
                        }}
                        events={event}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        drop={onDrop}
                        height={420}
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calender;
