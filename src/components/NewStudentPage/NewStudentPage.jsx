import React, {useState} from 'react'
import {Tabs, Button, Col, Alert} from 'antd'
import NewStudentForm from "../NewStudentForm/NewStudentForm";
import {useHistory} from "react-router-dom";
import Arrow from "../Templates/ArrowTemplate/Arrow";

const BASE_URL = "http://localhost:3000/"

function NewStudentPage(props) {
    const history = useHistory();

    return <main>
        <Button className={"app-button_transparent"}
                onClick={() => history.goBack()}>
            <Arrow/>
            назад к списку студентов
        </Button>
        <NewStudentForm />
    </main>
}

export default NewStudentPage