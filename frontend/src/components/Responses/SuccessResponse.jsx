import React from "react";
import './Response.css'
import GoBackButton from "../Templates/Buttons/GoBackButton";

export default class SuccessResponse extends React.Component {

    render() {
            return <React.Fragment>
                <main className={'message'}>
                    <h3 className={'success'}>
                        {this.props.location.state.message} :)
                    </h3>
                    <GoBackButton />
                </main>
            </React.Fragment>
    }
}
