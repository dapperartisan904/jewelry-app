import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

class Register extends Component {
  constructor(){
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('username', this.state.username);
    data.append('email', this.state.email);
    data.append('password', this.state.password); 
     

    console.log(data.entries(), ' this is data')
    for (let pair of data.entries()){
      console.log(pair[0]  ,', ', pair[1])
    }

    const registerCall = this.props.register(data);

    registerCall.then((data) => {
      console.log(data)
        if(data.status.message === "Success"){
          this.props.history.push('/profile') //go post a jewelry online, go to jewelry index
        } else {
          console.log(data, ' this should have an error message? How could you display that on the screen')
        }
    })
  }
  render(){
    console.log(this.state, this.props.userInfo, '<---Register page props')
    return (
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh'}}>
        <Grid.Column style={{maxWidth: 450}}>
          <Header as='h2' textAlign='center'>
            Register
          </Header>
          <Form onSubmit={this.handleSubmit}>
              <Segment stacked>
              Username:
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' type='text' name='username' onChange={this.handleChange}/>
              Email:
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='email' type='text' name='email' onChange={this.handleChange}/>
              password:
              <Form.Input fluid icon='lock' iconPosition='left' type='password' name='password' onChange={this.handleChange}/>
              <Button fluid size='large' type='sumbit'>Register</Button>
              <Message>
                Already a member? <Link to='/Login'>Login</Link>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
      )
  }
}

export default withRouter(Register);

