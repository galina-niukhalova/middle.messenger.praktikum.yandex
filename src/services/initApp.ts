import authAPI from 'api/auth';
import { UserDTO } from 'api/types/user';
import type { Dispatch } from 'core';
import { apiHasError } from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';

export async function initApp(dispatch: Dispatch<AppState>) {
  try {
    const response = await authAPI.getUser();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}
