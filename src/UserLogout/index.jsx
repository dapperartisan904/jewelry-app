import React, {Component} from 'react'


class UserLogout extends Component{
    //   delete user from localStorage
    componentDidMount(){
      let removedItem = localStorage.removeItem('user');
      return removedItem
    }
    render() {
        setTimeout(() => {
            this.props.history.push('/')
        }, 1500)
        return(
            <div>
                <div>
                    <h2>User has successfully logged out, Thank you for visiting Jewelry Shop</h2>
                </div>
            </div>
        )   
    }
}

export default UserLogout;