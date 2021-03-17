import "./NewStudentForm.css"
import React from "react";
import {Form, Input, Button, InputNumber } from "antd"
import {useHistory} from "react-router-dom";

import AvatarUploaderTemplate from "../Templates/AvatarUploaderTemplate/AvatarUploaderTemplate";

const BASE_URL = "http://213.189.218.32:8080/students/api/v1.0/students_list/"
const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, GET, HEAD",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Accept",
    "Content-Type": "application/json",
    "Accept":"application/json"
}

export default function NewStudentForm () {

    const specialities = ["Математика", "Математика и КН", "ФИИТ", "Механика", "Прикладная информатика"];
    const groups = {
        "Математика": ["МТ-101", "МТ-202", "МТ-203", "МТ-401"],
        "Математика и КН" : ["КН-101", "КН-102", "КН-103", "КН-201", "КН-202", "КН-303", "КН-401"],
        "ФИИТ": ["ФТ-101", "ФТ-102", "ФТ-203", "ФТ-401"],
        "Механика": ["МХ-101", "МХ-102", "МХ-103", "МХ-201", "МХ-202", "МХ-203", "МХ-301", "МХ-302", "МХ-401"],
        "Прикладная информатика": ["ПИ-101", "ПИ-102", "ПИ-201", "ПИ-301", "ПИ-401"],
    };

    const [ form ] = Form.useForm();

    const [pickedSpeciality, setSpeciality] = React.useState("");

    const history = useHistory();

    const onFinish = values => {
        let responsePath = "/responseSuccess"
            fetch(BASE_URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(values)
        } )
            .then(resp => resp.json())
            .then(resp => {
                if (resp.code !== 200) {
                    responsePath = "/responseFail"
                }
                history.push(responsePath, { code: resp.code, message: resp.message })
            })

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

                    onValuesChange={(v) => v.speciality ? setSpeciality(v.speciality) : null}
                >
                    <Form.Item
                        label="Аватар"
                        name="photo_link"
                        initialValue={"mock"}
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        <AvatarUploaderTemplate/>
                    </Form.Item>

                    <Form.Item name={"id"} initialValue={0} />
                    <div className={"fields-container"}>
                    <Form.Item
                        label="ФИО"
                        name="full_name"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            },
                            () => ({
                                validator(_, value) {
                                    if (!value || value.trim().split(" ").length === 3 &&
                                        value.trim().split(" ").every(value => value.match(/[А-ЯЁ][а-яё]*/))) {
                                        return Promise.resolve();
                                    }
                                    else if (!value || value.trim()
                                        .split(" ").some(value => !value.match(/[А-ЯЁ][а-яё]*/))) {
                                        return Promise.reject("Пожалуйста введите данные с заглавной буквы");
                                    }
                                    return Promise.reject("Введите фамилию, имя, отчество кириллицей");
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
                                message: "И это поле обязательно",
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
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        <InputNumber placeholder="100"
                                     min={1}
                                     max={100}/>
                    </Form.Item>

                    <Form.Item
                        label="Любимый цвет"
                        name="fav_colour"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        <div className={"colors"}>
                            <input type={"radio"} name={"color"} value={"red"} id={"red_color"}/>
                            <label htmlFor={"red_color"} className={"color red"}/>

                            <input type={"radio"} name={"color"} value={"yellow"} id={"yellow_color"}/>
                            <label htmlFor={"yellow_color"} className={"color yellow"}/>

                            <input type={"radio"} name={"color"} value={"green"} id={"green_color"}/>
                            <label htmlFor={"green_color"} className={"color green"}/>

                            <input type={"radio"} name={"color"} value={"blue"} id={"blue_color"}/>
                            <label htmlFor={"blue_color"} className={"color blue"}/>

                            <input type={"radio"} name={"color"} value={"black"} id={"black_color"}/>
                            <label htmlFor={"black_color"} className={"color black"}/>

                            <input type={"radio"} name={"color"} value={"lgbt"} id={"lgbt_color"}/>
                            <label htmlFor={"lgbt_color"} className={"color lgbt"}/>
                        </div>
                    </Form.Item>

                    <Form.Item
                        label="Специальность"
                        name="speciality"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        <select className={"fields-container__speciality"}>
                            <option value="" hidden={true} selected>Выбрать</option>
                            {specialities.map(spec => (<option value={spec}>{spec}</option>))}
                        </select>

                    </Form.Item>

                    <Form.Item
                        label="Группа"
                        name="group"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            },
                        ]}
                    >
                        <select className={"fields-container__speciality"}>
                            {groups[pickedSpeciality] ?
                                groups[pickedSpeciality].map(group => (<option value={group}>{group}</option>))
                                : <option value="" hidden={true}>Выбрать</option>}
                        </select>
                    </Form.Item>

                    <Form.Item
                        label="Пол"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        <select className={"fields-container__sex"}>
                            <option value="" hidden={true} selected>Выбрать</option>
                            <option value="m">Мужской</option>
                            <option value="f">Женский</option>
                        </select>
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