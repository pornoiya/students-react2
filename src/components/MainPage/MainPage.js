import React from 'react'
import './MainPage.css'
import { useHistory } from 'react-router-dom';
import StudentsList from "../StudentsList/StudentsList";
function MainPage() {
    const history = useHistory();

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
                <input type='search' className='search-bar' placeholder='Поиск по имени' />
                <div className='search-block__sorting'>
                    <select id={'sort-criteria-field'} className={'search-block__sorting_by-category'}>
                        <option selected value="">Имя</option>
                        <option value="rating-sorting">Рейтинг</option>
                        <option value="age-sorting">Возраст</option>
                    </select>

                    <select className={'search-block__sorting_by-scending'}>
                        <option selected value="descending">-
                        </option>
                        <option value="ascending">+</option>
                    </select>
                </div>
            </div>
            <div className={'fields_names'}>
                <span className={'fields_names__name'}>ФИО</span>
                <span className={'fields_names__speciality'}>Специальность</span>
                <span className={'fields_names__group'}>Группа</span>
                <span className={'fields_names__age'}>Возраст</span>
                <span className={'fields_names__rating'}>Рейтинг</span>
            </div>
            <StudentsList />
        </main>
    )
}

export default MainPage