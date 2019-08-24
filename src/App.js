import React, { Component } from 'react';
import {Route, Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Profile from './Profile'
import Register from './Register'
import ShippingForm from './ShippingForm'
import ClientContainer from './ClientContainer'
import './App.css'

const My404 = () => {
  return (
    <div>
      You are lost Buddy
    </div>
  )
} 

class App extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      username: '',
      email: '',
      image: '',
      loading: true
    }
  }

  logIn = async (loginInfo) => {
    try {
      const loginResponse = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const parsedResponse = await loginResponse.json()

      if (parsedResponse.status.code === 200) {
        this.setState(() => {
          return {
            ...parsedResponse.data,
            loading: false
          }
        })
      } else {
        console.log(parsedResponse.status.message)
      }

      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }
  register = async (data) => {
    try {
      const registerResponse = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        credentials: 'include',
        body: data,
        headers: {
          'enctype': 'multipart/form-data'
        }
      })

      const parsedResponse = await registerResponse.json()
      console.log(parsedResponse)

      this.setState({
        ...parsedResponse.data,
        loading: false
      })

      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    return (
      <main> 
        {
          this.state.loading ?
          <Switch>
            <Route exact path='/' render={(props) => <Login {...props} logIn={this.logIn} />} />
            <Route path='/register' render={(props) => <Register {...props} register={this.register} /> } />
          </Switch> :
          <main>
            <Header />
            <Switch>
              <Route path='/profile' render={(props) => <Profile {...props} userInfo={this.state} /> } />
              <Route path='/shippingForm' render={(props) => <ShippingForm {...props} userInfo={this.state} /> } />
              <Route path='/clientContainer' render={(props) => <ClientContainer {...props} userInfo={this.state} /> } /> 
              <Route path='/logout' />
              <Route component={My404} />
            </Switch>
          </main>
        }
        
      </main>
    )
  }
}

export default App;