import React from 'react'
import './StudentsList.css'
import '../../App.css'
import {Button} from "antd";
import { withRouter } from 'react-router-dom';

const BASE_URL = "http://localhost:8080/students/api/v1.0/students_list/"
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, GET',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }

class StudentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            students: []
        };
    }

    componentDidMount() {
        fetch(BASE_URL, {
            method: "GET",
            headers: headers } )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        students: result.students
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    deleteRequest(id) {
        fetch(BASE_URL + id, {
            method: "DELETE",
            headers: headers } )
            .then(res => res.json())
            .then(resp => alert(resp.message))
    }

    render() {
        const { error, isLoaded, students } = this.state;
        if (error) {
            return <div className={'info'} >Ошибка: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className={'info'}>Загрузка...</div>;
        } else if (!students){
            return <div className={'info'} >Похоже, в базе не осталось студентов :(
                <Button className={'app-button'}
                        onClick={() => this.props.history.push('/addStudent')}>
                    <div className='app-button_plus_sign'>
                        <div className='app-button_rectangle' />
                        <div className='app-button_rectangle_rotated' />
                    </div>
                    Добавить
                </Button>
            </div>;
        }
        else {
            return (
                <ul className={'items-container'}>
                    {students.map(resp => resp.student)
                        .map(st =>
                        <li key={st.id}
                        className={'student-field'}>
                            <span className={'student-field__photo'}></span>
                            <span className={'student-field__name'}>{st.full_name}</span>
                            <span className={'student-field__speciality'}>{st.speciality}</span>
                            <span className={'student-field__group'}>{st.group}</span>
                            <span className={'student-field__age'}>{st.age}</span>
                            <span className={'student-field__rating'}>{st.rating}</span>
                            <span>{st.fav_colour}</span>
                            <button className={'delete-button'}
                                    onClick={() => { this.deleteRequest(st.id) }}
                            > -- </button>
                        </li>)}
                </ul>
            );
        }
    }
}

export default withRouter(StudentsList)