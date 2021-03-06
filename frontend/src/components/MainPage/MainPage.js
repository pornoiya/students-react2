import React from 'react'
import './MainPage.css'
import { useHistory } from 'react-router-dom';
import StudentsList from "../StudentsList/StudentsList";
import {useState} from "react";
import {BASE_URL, headers, upload} from "../../config";

function MainPage() {
    const [sortInfo, setSorting] = useState({
        criteria: 'full_name',
        descending: ''
    });

//  Почему не редакс, а хуки. Я была малознакома с редаксом.
//  Буквально на днях я разобралась что это такое. Что значат диспатч,
//  стейт ту пропс, стор, что такое селекторы и т.д.

    const [query, setQuery] = useState('');
    const [studentsDefault, setStudentsDefault] = useState([]);
    const [studentsList, setStudentsList] = useState([]);
    const [avatars, setAvatars] = useState([]);

    const [isLoaded, setIsLoaded] = useState({
        isLoaded: false,
        error: null
    });

    const [isAvatarsLoaded, setIsAvatarsLoaded] = useState({
        isAvatarsLoaded: false,
        error: null
    });

    const fetchData = async (url, handler, errorHandler) => {
        return await fetch(url, {
            method: "GET",
            headers: headers } )
            .then(res => res.json())
            .then(
                (result) => { handler(result) },
                (error) => { errorHandler(error) }
            )
    }

    const updateInput = async (query) => {
        const filtered = studentsDefault.filter(data => {
            return data.student.full_name.toLowerCase().includes(query.toLowerCase())
        })
        setQuery(query);
        setStudentsList(filtered);
    }

    const sortingHandler = (e) => {
        const key = e.target.name
        if (key === 'descending') {
            setSorting({...sortInfo, [key]: e.target.checked})
        }
        else {
            setSorting({...sortInfo, [key]: e.target.value})
        }
    }

    const studentsHandler = (result) => {
        const students = ! result.students ? null
            : result.students
        setStudentsDefault(students)
        setStudentsList(students)
        setIsLoaded({
            isLoaded: true,
        });
    }

    const studentErrorHandler = (error) => {
        setIsLoaded({
            isLoaded: true,
            error
        });
    }

    const avatarsHandler = (result) => {
        const avatars = ! result.avatars ? null
            : result.avatars
        setAvatars(avatars)
        setIsAvatarsLoaded({
            isAvatarsLoaded: true,
        });
    }

    const avatarErrorHandler = (error) => {
        setIsAvatarsLoaded({
            isAvatarsLoaded: true,
            error
        });
    }

    const history = useHistory();
    React.useEffect( () => {
        fetchData(BASE_URL, studentsHandler, studentErrorHandler)
        fetchData( BASE_URL + upload, avatarsHandler, avatarErrorHandler)
    },[]);


    return (
        <main>
            <div className='page-primary-info'>
                <h1 className='page-primary-info__head-name'>Студенты</h1>
                <button className='app-button' id='add-new-student-button'
                        onClick={() => history.push('/addStudent')}>
                    <div className='app-button_plus_sign'>
                        <div className='app-button_rectangle' />
                        <div className='app-button_rectangle_rotated' />
                    </div>
                    <span>Добавить студента</span>
                </button>
            </div>
            <div className='search-block'>
                <input type='search' className='search-bar'
                       placeholder='Поиск по имени'
                       value={query}
                       onChange={(event) => updateInput(event.target.value)}
                />
                <div className='search-block__sorting'>
                    <select id={'sort-criteria-field'}
                            name={'criteria'}
                            className={'search-block__sorting_by-category'}
                            onChange={(event) =>
                                sortingHandler(event)}
                    >
                        <option selected value="full_name">Имя</option>
                        <option value="rating">Рейтинг</option>
                        <option value="age">Возраст</option>
                        <option value="fav_colour">Цвет</option>
                    </select>

                    <input type='checkbox' className={'search-block__sorting_by-ascending'} name={'descending'}
                           onChange={(event) => sortingHandler(event)}
                    >
                    </input>

                </div>
            </div>
            <div className={'fields_names'}>
                <span className={'fields_names__name'}>ФИО</span>
                <span className={'fields_names__speciality'}>Специальность</span>
                <span className={'fields_names__group'}>Группа</span>
                <span className={'fields_names__age'}>Возраст</span>
                <span className={'fields_names__rating'}>Рейтинг</span>
            </div>
            <StudentsList descending={sortInfo.descending}
                          criteria={sortInfo.criteria}
                          isLoaded={isLoaded}
                          avatars={isAvatarsLoaded.isAvatarsLoaded ? avatars : []}
                          students={studentsList ? studentsList : studentsDefault}/>

        </main>
    )
}

export default MainPage