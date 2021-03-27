import "./NewStudentForm.css"
import React from "react";
import {Form, Input, Button, InputNumber } from "antd"
import {useHistory} from "react-router-dom";
import {BASE_URL, headers, upload} from "../../config";


//  Формы. Есть библиотеки, которые облегчают работу с формами: хранение значений,
//  обработка данных при отправке формы и т.п. Самая популярная из них -- формик.
//  Я выбрала antd forms, потому что в документации был удобный и простой пример
//  загрузки файла с его отображением, а еще мне было интересно узнать об альтернативах
//  формику, потому что монополия это плохо. Пока есть выбор, продукты будут развиваться.

//  upd: при правках я вообще отказалась от ant uploader и создала новые элементы

//  Axios vs fetch api. Библиотека -- лишняя нагрузка на сервер, хотя axios требует
//  меньше кода, ее методы интуитивнее и она нормально обрабатывает ошибки с сервера


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

    const [avatarState, setAvatarState] = React.useState({
        name: "",
        isLoaded: false,
        base64: ""
    });

    const [width, setWidth]   = React.useState(window.innerWidth);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }

    React.useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

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

            fetch(BASE_URL + upload, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({id: avatarState.name, avatar: avatarState.base64})
            } )
                .then(resp => resp.json())
                .then(resp => {
                    if (resp.code !== 200) {
                        error.message({ code: resp.code, message: resp.message })
                    }
                })
            .catch(err => error.message({ code: resp.code, message: resp.message }))
    };

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onPhotoChangeHandler = (event) => {
        getBase64(event.target.files[0]).then(res => {
            setAvatarState({isLoaded: true, base64: res, name: event.target.files[0].name})
        })
            .catch(err => alert(err))
    }

    return (
        <>
            <h1 className={'page-primary-info__head-name'}>Новый студент</h1>
            <div className={'form'}>
                <Form
                    layout="vertical"
                    className={"student-form"}
                    name="student-form"
                    form={form}
                    onFinish={onFinish}

                    onValuesChange={(v) => v.speciality ? setSpeciality(v.speciality) : null}
                >
                    <Form.Item
                        name="photo_link"
                        rules={[
                            {
                                required: true,
                                message: "Это поле обязательно",
                            }
                        ]}
                    >
                        {! avatarState.isLoaded ?
                             <label className={'custom-upload'}>
                                 <input type="file" name="file"
                                        className={'avatar-uploader-original-file'}
                                        onChange={(e) =>
                                            onPhotoChangeHandler(e)}
                                        accept={'image/jpeg, image/png'}/>
                                 <div className={'avatar-area'} >ФИ</div>
                                 <div className={'upload'}>
                                     <p className={'upload-title'}>Загрузить аватар</p>
                                     <p className={'upload-avatar-size'}>500х500</p>
                                 </div>
                             </label>
                            :
                            <div className={'custom-upload'}>
                                <img className={'avatar-area'} src={avatarState.base64} alt={'user avatar'} />
                                <div className={'upload'}>
                                    <p className={'upload-title'}>Аватар загружен</p>
                                    <p className={'upload-avatar-size'}>500х500</p>
                                </div>
                            </div>
                        }

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
                                            value.trim().split(" ").every(value => value.match(/^[А-ЯЁ][а-яё]*/))) {
                                            return Promise.resolve();
                                        }
                                        else if (!value || value.trim()
                                            .split(" ").some(value => !value.match(/^[А-ЯЁ][а-яё]*/))) {
                                            return Promise.reject("Пожалуйста введите данные с заглавной буквы кириллицей");
                                        }
                                        return Promise.reject("Введите фамилию, имя, отчество кириллицей");
                                    },
                                })
                            ]}
                        >
                            <Input placeholder="Иванов Иван Иванович" />
                        </Form.Item>

                        <Form.Item
                            label={"Email"}
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: "Это поле тоже обязательно"
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value || value
                                            .match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Введите валидный e-mail: mymail@example.com");
                                    },
                                })
                            ]}
                        >
                            <Input type={'email'} className={'fields_container__email'}
                                   placeholder={'ivanov@gmail.com'} />
                        </Form.Item>

                        <Form.Item
                            label="Возраст"
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    message: "И это поле обязательно",
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value || 18 <= value && value <= 100) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject("Введите возраст от 18 до 100 лет");
                                    },
                                }),
                            ]}
                        >
                            <InputNumber placeholder="18"/>
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
                                <option value="" hidden={true}>Выбрать</option>
                                {groups[pickedSpeciality] ?
                                    groups[pickedSpeciality].map(group => (<option value={group}>{group}</option>))
                                    : <option value="" hidden={true}>Выбрать</option>
                                }
                            </select>
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
                            {width <= 690 ?
                                <select className={"fields-container__color mobile"}>
                                    <option value="" hidden={true} selected>Выбрать</option>
                                    <option value="red">Красный</option>
                                    <option value="orange">Оранжевый</option>
                                    <option value="yellow">Жёлтый</option>
                                    <option value="green">Зелёный</option>
                                    <option value="blue">Синий</option>
                                    <option value="black">Чёрный</option>
                                    <option value="lgbt">ЛГБТ</option>
                                </select>
                            :
                                <div className={"colors desktop"}>
                                    <input type={"radio"} name={"color"} value={"red"} id={"red_color"}/>
                                    <label htmlFor={"red_color"} className={"color red"}/>

                                    <input type={"radio"} name={"color"} value={"yellow"} id={"yellow_color"}/>
                                    <label htmlFor={"yellow_color"} className={"color yellow"}/>

                                    <input type={"radio"} name={"color"} value={"orange"} id={"orange_color"}/>
                                    <label htmlFor={"orange_color"} className={"color orange"}/>

                                    <input type={"radio"} name={"color"} value={"green"} id={"green_color"}/>
                                    <label htmlFor={"green_color"} className={"color green"}/>

                                    <input type={"radio"} name={"color"} value={"blue"} id={"blue_color"}/>
                                    <label htmlFor={"blue_color"} className={"color blue"}/>

                                    <input type={"radio"} name={"color"} value={"black"} id={"black_color"}/>
                                    <label htmlFor={"black_color"} className={"color black"}/>

                                    <input type={"radio"} name={"color"} value={"lgbt"} id={"lgbt_color"}/>
                                    <label htmlFor={"lgbt_color"} className={"color lgbt"}/>
                                </div>
                            }
                        </Form.Item>

                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="app-button create">
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
};