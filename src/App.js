import { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import PageRender from './customeRouter/PageRender'
import PrivateRouter from './customeRouter/PrivateRouter';
import Login from './pages/Login'
import Register from './pages/Register'
import Alert from './components/Alert/Alert'
import Header from './components/Header/Header';
import Home from './pages/Home'
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './redux/actions/authAction'
import StatusModal from './components/StatusModal';
import { getPosts } from './redux/actions/postAction';

function App() {
    const { auth, status, modal } = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(refreshToken())
    }, [dispatch])

    useEffect(() => {
      if(auth.token)
          dispatch(getPosts(auth.token))
    }, [dispatch, auth.token])

    return (
      <Router>
          <Alert />

          <input type='checkbox' id='theme'/>
          <div className='App'>
              <div className='main'>
                  { auth.token && <Header /> }
                  { status && <StatusModal /> }
                  <Route exact path='/' component={auth.token ? Home : Login}/>
                  <Route exact path='/Register' component={Register}/>
                  
                  <PrivateRouter exact path='/:page' component={PageRender}/>
                  <PrivateRouter exact path="/:page/:id" component={PageRender} />
              </div>
          </div>
      </Router>
    );
}

export default App;
