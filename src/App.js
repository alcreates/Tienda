import logo from './logo.svg';
import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route , Redirect} from 'react-router-dom';
import ShopPage from './pages/shoppage/shoppage.component';
import Header from './components/Header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  
  unSubscribeFromAuth = null;
  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async(userAuth) => {
    const {setCurrentUser} = this.props;
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data()
            }
          });
         console.log(snapShot, "snap")
        });
      }
      setCurrentUser(userAuth);
      
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route exact path='/shop' component={ShopPage}/>
          <Route exact path='/signin' 
          render={()=> this.props.currentUser ? (
          <Redirect to='/'/>
          ) : 
          (<SignInAndSignUpPage/>)
          }/>
        </Switch>
      </div>
    );
  }
  
}
const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps ,mapDispatchToProps)(App);
