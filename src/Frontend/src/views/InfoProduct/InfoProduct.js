import React from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios';

class InfoProduct extends React.Component {

    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;

            try {
                let res = await axios.get(`http://localhost:8080/api/v1/product/${id}`);
                console.log(">>>Check res user: ", res.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
    }



    render() {
        console.log(">>>Check props: ", this.props)
        return (
            <div>Xin chào with id: {this.props.match.params.id}</div>
        )
    }
}

export default withRouter(InfoProduct);