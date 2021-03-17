import { Button } from 'antd'
import {useHistory} from "react-router-dom";
import Arrow from "../ArrowTemplate/Arrow";

function GoBackButton() {
    const history = useHistory();

    return (
        <Button className={"app-button_transparent"}
                onClick={() => history.push('/')}>
            <Arrow/>
            назад к списку студентов
        </Button>)
}

export default GoBackButton