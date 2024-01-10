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

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//import Images
import verification from "../../assets/images/verification-img.png";

// import {
//   addNewEvent as onAddNewEvent,
//   deleteEvent as onDeleteEvent,
//   getCategories as onGetCategories,
//   getEvents as onGetEvents,
//   updateEvent as onUpdateEvent,
// } from "../../store/actions";

import DeleteModal from "./DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const Calender = props => {

  const dispatch = useDispatch();

//   const [event, setEvent] = useState([]);
  const [isEdit, setIsEdit] = useState(false);


  const selectCalendarState = (state) => state.calendar;

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

//   const {
//     events,
//     categories
//   } = useSelector(CalendarProperties);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [modalcategory, setModalcategory] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

//   useEffect(() => {
//     dispatch(onGetCategories());
//     dispatch(onGetEvents());
//     new Draggable(document.getElementById("external-events"), {
//       itemSelector: ".external-event",
//     });
//   }, [dispatch]);

//   useEffect(() => {
//     if (!modalcategory && !isEmpty(event) && !!isEdit) {
//       setTimeout(() => {
//         setEvent({});
//         setIsEdit(false);
//       }, 500);
//     }
//   }, [modalcategory, event]);

  /**
   * Handling the modal state
   */
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
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Calendar" breadcrumbItem="Full Calendar" /> */}
          <Row>
            <Col className="col-12">
              <Row >
                {/* <Col xl={3}>
                  <Card>
                    <CardBody>
                      <div className="d-grid">
                        <Button
                          color="primary"
                          className="font-16 btn-block"
                          onClick={toggle}
                        >
                          <i className="mdi mdi-plus-circle-outline me-1" />
                          Create New Event
                        </Button>
                      </div>

                      <div id="external-events" className="mt-2">
                        <br />
                        <p className="text-muted">
                          Drag and drop your event or click in the calendar
                        </p>
                        {categories &&
                          categories.map((category, i) => (
                            <div
                              className={`${category.type} external-event fc-event text-white`}
                              key={"cat-" + category.id}
                              draggable
                              onDrag={event => onDrag(event, category)}
                            >
                              <i className="mdi mdi-checkbox-blank-circle font-size-11 me-2" />
                              {category.title}
                            </div>
                          ))}
                      </div>

                      <Row className="justify-content-center mt-5">
                        <img src={verification} alt="" className="img-fluid d-block" />
                      </Row>
                    </CardBody>
                  </Card>
                </Col> */}

                <Col xl={12} >
                  <Card >
                    <CardBody className="h-75">
                      {/* fullcalendar control */}
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
                        // dateClick={handleDateClick}
                        // eventClick={handleEventClick}
                        drop={onDrop}
                        height={420}
                      />
                    </CardBody>
                  </Card>

                  {/* <Modal
                    isOpen={modalcategory}
                    className={props.className}
                    centered
                  >
                    <ModalHeader toggle={toggle} tag="h5">
                      {!!isEdit ? "Edit Event" : "Add Event"}
                    </ModalHeader>
                    <ModalBody className="p-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          categoryValidation.handleSubmit();
                          return false;
                        }}
                      >
                        <Row>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Event Name</Label>
                              <Input
                                name="title"
                                type="text"
                                placeholder="Insert Event Name"
                                onChange={categoryValidation.handleChange}
                                onBlur={categoryValidation.handleBlur}
                                value={categoryValidation.values.title || ""}
                                invalid={
                                  categoryValidation.touched.title && categoryValidation.errors.title ? true : false
                                }
                              />
                              {categoryValidation.touched.title && categoryValidation.errors.title ? (
                                <FormFeedback type="invalid">{categoryValidation.errors.title}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col className="col-12">
                            <div className="mb-3">
                              <Label className="form-label">Category</Label>
                              <Input
                                type="select"
                                name="category"
                                placeholder="All Day Event"
                                onChange={categoryValidation.handleChange}
                                onBlur={categoryValidation.handleBlur}
                                value={categoryValidation.values.category || ""}
                                invalid={
                                  categoryValidation.touched.category && categoryValidation.errors.category ? true : false
                                }
                              >
                                <option value="bg-danger">Danger</option>
                                <option value="bg-success">Success</option>
                                <option value="bg-primary">Primary</option>
                                <option value="bg-info">Info</option>
                                <option value="bg-dark">Dark</option>
                                <option value="bg-warning">Warning</option>
                              </Input>
                              {categoryValidation.touched.category && categoryValidation.errors.category ? (
                                <FormFeedback type="invalid">{categoryValidation.errors.category}</FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col className="col-6">
                            {isEdit &&
                              <button type="button" className="btn btn-danger" id="btn-delete-event" onClick={() => { toggle(); setDeleteModal(true) }}>Delete</button>
                            }
                          </Col>

                          <Col className="col-6 text-end">
                            <button
                              type="button"
                              className="btn btn-light me-1"
                              onClick={toggle}
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn btn-success"
                              id="btn-save-event"
                            >
                              Save
                            </button>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

// Calender.propTypes = {
//   events: PropTypes.array,
//   categories: PropTypes.array,
//   className: PropTypes.string,
//   onGetEvents: PropTypes.func,
//   onAddNewEvent: PropTypes.func,
//   onUpdateEvent: PropTypes.func,
//   onDeleteEvent: PropTypes.func,
//   onGetCategories: PropTypes.func,
// };

export default Calender;
