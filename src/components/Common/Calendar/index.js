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
import DeleteModal from "../DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { useStateContext } from "Context/ContextProvider"
import { getDatesBetweenDates } from "Functions/leaveFormFunctions";
import { Link } from "react-router-dom";
const Calender = props => {
  const {leaveDetail}=useStateContext();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  let event  = [
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
  ];
  
 leaveDetail.map((data)=>{
  if(data.status==='approved'){
  const days =  getDatesBetweenDates(new Date(data.from),new Date(data.to))
  for(let i=0;i<days.length;i++){
    let month=0
    if(days[i].getMonth()+1<=9){
      month='0'+(days[i].getMonth()+1)
    }else{
      month=days[i].getMonth()+1
    }
    console.log(days[i].getMonth()+1)
    const date = days[i].getFullYear()+"-"+month+"-"+days[i].getDate()
    let dataSchema = {title:data.name+"'s "+data.leaveType,start:date,className:'hoiday-event',allDay:true}
    event.push(dataSchema)
  }
  
  }
})
  // const event = 
 
  // if(!leaveDetail) return
  // event=[...event,...teamLeave]
  console.log('event',event)
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [modalcategory, setModalcategory] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  useEffect(() => {
    if (!modalcategory && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
      }, 500);
    }
  }, [modalcategory, event]);
  const toggle = () => {
    if (modalcategory) {
      setModalcategory(false);
      // setEvent(null);
      // setIsEdit(false);
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
  const categoryValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (event && event.title) || '',
      category: (event && event.category) || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Your Event Name"),
      category: Yup.string().required("Please Enter Your Billing Name"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateEvent = {
          id: event.id,
          title: values.title,
          classNames: values.category + " text-white",
          start: event.start,
        };
        // update event
        dispatch(onUpdateEvent(updateEvent));
        categoryValidation.resetForm();
      } else {
        const newEvent = {
          id: Math.floor(Math.random() * 100),
          title: values["title"],
          start: selectedDay ? selectedDay.date : new Date(),
          className: values['category']
            ? values['category'] + " text-white"
            : "bg-primary text-white"
          ,
        };
        // save new event
        dispatch(onAddNewEvent(newEvent));
        categoryValidation.resetForm()
      }
      toggle();
    },
  });

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
  let task
  if(selectedDay){
    task = event.filter(data=>data.start===selectedDay.dateStr)
  }

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
                        dateClick={handleDateClick}
                        eventClick={handleEventClick}
                        drop={onDrop}
                        height={420}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Modal
                    isOpen={modalcategory}
                    className={props.className}
                    centered
                  >
                    <ModalHeader toggle={toggle} tag="h5">
                      {'View Event'}
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
                              {(selectedDay) && (task.map((data)=>(
                                <ul key={data} className="" style={{listStyle:'none'}}>
                                  <li>{data.title}</li>
                                </ul>
                              )))}
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
                            <Link to={'/addleave'}>
                            <button
                              type="button"
                              className="btn btn-primary me-1"
                              onClick={toggle}
                            >
                              +Add Leave
                            </button>
                            </Link>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Calender;
