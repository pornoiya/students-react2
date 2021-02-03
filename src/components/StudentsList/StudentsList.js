import React from 'react'
import bin from '../../icons/bin.svg'
import star from '../../icons/star.svg'
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
            students: [],
            queryResult: []
        };
    }

    componentDidUpdate() {
        this.state.queryResult = this.state.students.filter(student =>
            student.student.full_name.toLowerCase().includes(this.props.query.toLowerCase())
        );
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
                        students: result.students,
                        queryResult: result.students.filter(jsoned =>
                            jsoned.student.full_name.toLowerCase()
                                .includes(this.props.query.toLowerCase()))
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
        document.location.reload();
    }

    studentsSort(studentA, studentB) {
        if (this.props.criteria === 'full_name') {
            if (! this.props.descending)
                return studentB.full_name.localeCompare(studentA.full_name)
            else
                return (studentB.full_name.localeCompare(studentA.full_name) * -1)
        }
        else {
            if (! this.props.descending)
                    return studentA[this.props.criteria] < studentB[this.props.criteria] ? -1: 1
            else
                return studentA[this.props.criteria] < studentB[this.props.criteria] ? 1: -1
        }
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
                    {this.state.queryResult
                        .map(resp => resp.student)
                        .sort((a, b) => this.studentsSort(a, b))
                        .map(st =>
                            <li key={st.id}
                                className={'student-field'}
                            >
                                <span className={'student-field__photo'}><img src={st.photo_link} alt={'User picture'}/></span>
                                <span className={'fields_names__name'}>{st.full_name}</span>
                                <span className={'fields_names__speciality'}>{st.speciality}</span>
                                <span className={'fields_names__group'}>{st.group}</span>
                                <span className={'fields_names__age'}>{st.age}</span>
                                <div className={'student-field_divider'} />
                                <span className={'fields_names__rating'}>{st.rating}</span>
                                <img src={star} alt='' className={'rating_label'}/>
                                <div className={`color ${st.fav_colour}`}/>

                                <button className={'delete-button'}
                                        onClick={() => { this.deleteRequest(st.id) }}
                                >
                                    <img src={bin} alt={'Bin sign'} />
                                </button>
                            </li>)}
                </ul>
            );
        }
    }
}

export default withRouter(StudentsList)