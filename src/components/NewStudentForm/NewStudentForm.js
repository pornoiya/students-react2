import React, { useState } from 'react';
import './NewStudentForm.css'
import {Form, Input, Button, InputNumber, Upload, message } from 'antd'
import {useHistory} from "react-router-dom";

const BASE_URL = "http://localhost:8080/students/api/v1.0/students_list/"
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, PUT, GET, HEAD',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    "Content-Type": "application/json",
    "Accept":"application/json"
}

export default function NewStudentForm () {
    const [avatar, setAvatar] = useState('');

    const [ form ] = Form.useForm();

    const history = useHistory();

    const onFinish = values => {
        fetch(BASE_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values)
        } )
            .then(resp => resp.json())
            .then(resp => {
                if (resp.code === 200) {
                    history.push('/responseSuccess', { code: resp.code, message: resp.message })
                } else {
                    history.push('/responseFail', { code: resp.code, message: resp.message })
                }
            })

    };

    const fileChangeHandler = (event) => {
        setAvatar(event.target.files[0])
    }

    return (
        <>
            <h1>Новый студент</h1>
            <div>
                <Form
                    layout="vertical"
                    className={"student-form"}
                    name="student-form"
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item name={'id'} initialValue={0} />
                    <div className={'fields-container'}>
                    <Form.Item
                        label="ФИО"
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            },
                            ({ }) => ({
                                validator(_, value) {
                                    const nameParts = value.trim().split(" ");
                                    if (!value || nameParts.length === 3 &&
                                        nameParts.every(value => value.match(/[А-ЯЁ][а-яё]*/))) {
                                        return Promise.resolve();
                                    }
                                    else if (nameParts.some(value => !value.match(/[А-ЯЁ][а-яё]*/))) {
                                        return Promise.reject('Пожалуйста введите данные с заглавной буквы');
                                    }
                                    return Promise.reject('Введите фамилию, имя, отчество кириллицей');
                                },
                            }),
                        ]}
                    >
                        <Input placeholder="Иванов Иван Иванович" />
                    </Form.Item>

                    <Form.Item
                        label="Возраст"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'И это поле обязательно',
                            }
                        ]}
                    >
                        <InputNumber placeholder="18" min={18} max={100}/>
                    </Form.Item>

                    <Form.Item
                        label="Рейтинг"
                        name="rating"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <InputNumber placeholder="100" min={1} max={100}/>
                    </Form.Item>

                    <Form.Item
                        label="Любимый цвет"
                        name="fav_colour"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <div className={'colors'}>
                            <input type={'radio'} name={'color'} value={'red'} id={'red_color'}/>
                            <label htmlFor={'red_color'} className={'color red'}/>

                            <input type={'radio'} name={'color'} value={'yellow'} id={'yellow_color'}/>
                            <label htmlFor={'yellow_color'} className={'color yellow'}/>

                            <input type={'radio'} name={'color'} value={'green'} id={'green_color'}/>
                            <label htmlFor={'green_color'} className={'color green'}/>

                            <input type={'radio'} name={'color'} value={'blue'} id={'blue_color'}/>
                            <label htmlFor={'blue_color'} className={'color blue'}/>

                            <input type={'radio'} name={'color'} value={'black'} id={'black_color'}/>
                            <label htmlFor={'black_color'} className={'color black'}/>

                            <input type={'radio'} name={'color'} value={'lgbt'} id={'lgbt_color'}/>
                            <label htmlFor={'lgbt_color'} className={'color lgbt'}/>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Специальность"
                        name="speciality"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <select className={'fields-container__speciality'}>
                            <option value="" hidden='true' selected>Выбрать</option>
                            <option value="Математика">Математика</option>
                            <option value="ФИИТ">ФИИТ</option>
                            <option value="Математика и КН">Математика и КН</option>
                            <option value="Механика">Механика</option>
                            <option value="Прикладная информатика">Прикладная информатика</option>
                        </select>
                    </Form.Item>

                    <Form.Item
                        label="Группа"
                        name="group"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            },
                            ({ }) => ({
                                validator(_, value) {
                                    if (!value || value.trim().match(/[А-ЯЁ]+-\d+/)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Группа содержит заглавные буквы и цифры, разделенные дефисом.');
                                },
                            })
                        ]}
                    >
                        <Input placeholder="ПИ-101" />
                    </Form.Item>

                    <Form.Item
                        label="Пол"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <select className={'fields-container__sex'}>
                            <option value="" hidden='true' selected>Выбрать</option>
                            <option value="m">Мужской</option>
                            <option value="f">Женский</option>
                        </select>
                    </Form.Item>

                    <Form.Item
                        label="Аватар"
                        name="photo_link"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <input type="file" name={'photo_link'} onChange={fileChangeHandler} accept="image/*" />
                        {/*<Input placeholder="photo_link" />*/}
                    </Form.Item>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="app-button">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
};