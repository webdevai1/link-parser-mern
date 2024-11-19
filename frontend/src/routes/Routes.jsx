import { Routes as Switch, Route } from 'react-router-dom';
import { LinksPage, CreatePage, DetailsPage, AuthPage } from '../pages';
import { AUTH, CREATE, DETAILS, LINKS } from './path';

export const Routes = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={LINKS} exact element={<LinksPage />} />
        <Route path={CREATE} exact element={<CreatePage />} />
        <Route path={`${DETAILS}/:id`} exact element={<DetailsPage />} />
        <Route path="*" exact element={<CreatePage />} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={AUTH} exact element={<AuthPage />} />
      <Route path="*" exact element={<AuthPage />} />
    </Switch>
  );
};
