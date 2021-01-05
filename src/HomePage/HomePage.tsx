import { todoService, User } from '../_services';
import { Link } from 'react-router-dom';
import { RootState } from '../_reducers';
import { connect } from 'react-redux';
import React from 'react';

type HomePageProps = { user: User };

class HomePage extends React.Component<HomePageProps, {}> {
    render() {
        const { user } = this.props;
        return (
          <div>
            <h1>Hi {user && user.name}</h1>
            <Link to="/login">Logout</Link>
          </div>
        );
    }
}

function mapStateToProps(state: RootState) {
  const { authentication: { user } } = state;
  return user ? { user } : { user: {} as User };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
