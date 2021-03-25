import React from 'react'
import bin from '../../icons/bin.svg'
import star from '../../icons/star.svg'
import './StudentsList.css'
import '../../App.css'
import {Button} from "antd";
import { withRouter } from 'react-router-dom';
import {BASE_URL, headers} from "../../config";


//    Сортировка по цветам радуги привычнее и понятнее для пользователя, чем
//    сортировка лексикографически или по 16-ричному числу

const rainbowOrder = {
    "lgbt": 0,
    "red": 1,
    "orange": 2,
    "yellow": 3,
    "green": 4,
    "blue": 5,
    "black": 6
}

function StudentsList(props) {

    const deleteRequest = (id) => {
        fetch(BASE_URL + id, {
            method: "DELETE",
            headers: headers } )
            .then(res => res.json())
        document.location.reload();
    }

    const studentsSort = (studentA, studentB) => {
        if (props.criteria === 'full_name') {
            if (! props.descending)
                return studentB.full_name.localeCompare(studentA.full_name)
            else
                return (studentB.full_name.localeCompare(studentA.full_name) * -1)
        }
        else if (props.criteria === 'fav_colour') {
            if (! props.descending)
                return rainbowOrder[studentA.fav_colour.trim()] <
                rainbowOrder[studentB.fav_colour.trim()] ? -1: 1
            else
                return rainbowOrder[studentA.fav_colour.trim()] <
                rainbowOrder[studentB.fav_colour.trim()] ? 1: -1;
        }
        else {
            if (! props.descending)
                    return studentA[props.criteria] < studentB[props.criteria] ? -1: 1
            else
                return studentA[props.criteria] < studentB[props.criteria] ? 1: -1
        }
    }

    const students = props.students
    const isLoaded = props.isLoaded

    if (isLoaded.error) {
        return <div className={'info'} >Ошибка: {isLoaded.error.message}</div>;
    } else if (! isLoaded.isLoaded) {
        return <div className={'info'}>Загрузка...</div>;
    }
    else if (! students){
        return <div className={'info'} >Похоже, в базе не осталось студентов :(
            <Button className={'app-button'}
                    onClick={() => props.history.push('/addStudent')}>
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
                {  students
                    .map(resp => resp.student)
                    .sort((a, b) => studentsSort(a, b))
                    .map(st =>
                        <li key={st.id}
                            className={'student-field'}
                        >
                            <span className={'student-field__photo'}>
                                {/*{alert(props.avatars)}*/}
                                {/*{props.avatars.filter(a => a.avatar === 'AAABAAE')[0].avatar}*/}
                                <img src={props.avatars.filter(a => a.avatar === 'AAABAAE')[0].avatar}
                                     alt={'User picture'}/></span>
                            <span className={'fields_names__name'}>{st.full_name}</span>
                            <span className={'fields_names__speciality'}>{st.speciality}</span>
                            <span className={'fields_names__group'}>{st.group}</span>
                            <span className={'fields_names__age'}>{st.age}</span>
                            <div className={'student-field_divider'} />
                            <span className={'fields_names__rating'}>{st.rating}</span>
                            <img src={star} alt='' className={'rating_label'}/>
                            <div className={`color ${st.fav_colour}`}/>

                            <button className={'delete-button'}
                                    onClick={() => { deleteRequest(st.id) }}
                            >
                                <img src={bin} alt={'Bin sign'} />
                            </button>
                        </li>)}
            </ul>
        );
    }
}

export default withRouter(StudentsList)