import React from 'react'
import GoBackButton from "../Templates/Buttons/GoBackButton";
import NewStudentForm from "../NewStudentForm/NewStudentForm";

function NewStudentPage() {
    return <main>
        <GoBackButton title='Назад к списку студентов' />
        <NewStudentForm />
    </main>
}

export default NewStudentPage