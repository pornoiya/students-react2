import React, { useState } from 'react';
import './NewStudentForm.css'
import {Form, Radio, Input, Button, InputNumber, Select} from 'antd'
import PropTypes from 'prop-types'

const BASE_URL = "http://localhost:8080/students/api/v1.0/students_list/"
// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'POST, PUT, GET',
//     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
//

export default function NewStudentForm () {
    const [ form ] = Form.useForm();

    const onFinish = values => {
        fetch(BASE_URL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        } )
            .then(res => res.json())
    };

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
                    <Form.Item name={'id'} initialValue={3266} />
                    <div className={'fields-container'}>
                    <Form.Item
                        label="ФИО"
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
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
                        <Input placeholder="100" />
                    </Form.Item>

                    <Form.Item
                        label="Spec"
                        name="speciality"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <select
                            placeholder="Select a option and change input text above"
                        >
                            <option value="" hidden='true' selected>Выбрать</option>
                            <option value="Математика">Математика</option>
                            <option value="ФИИТ">ФИИТ</option>
                            <option value="Математика и КН">Математика и КН</option>
                            <option value="Механика">Механика</option>
                            <option value="Прикладная информатика">Прикладная информатика</option>
                        </select>
                    </Form.Item>

                    <Form.Item
                        label="grop"
                        name="group"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <Input placeholder="gr" />
                    </Form.Item>

                    <Form.Item
                        label="sex"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <Input placeholder="sex" />
                    </Form.Item>

                    <Form.Item
                        label="photo_link"
                        name="photo_link"
                        rules={[
                            {
                                required: true,
                                message: 'Это поле обязательно',
                            }
                        ]}
                    >
                        <Input placeholder="photo_link" />
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

NewStudentForm.propTypes = {
    submitFunction: PropTypes.func
}