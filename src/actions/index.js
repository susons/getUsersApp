import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

//refactor
// export const fetchPosts = () => {
//   return async function(dispatch, getState) {
//     const response = await jsonPlaceholder.get('/posts');

//     dispatch({
//       type: 'FETCH_POSTS',
//       payload: response,
//     })
//   };
// };

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data,
  })
};

//TODO: memoized version
// export const fetchUser = (userId) => dispatch => _fetchUser(userId, dispatch);

// const _fetchUser =  _.memoize(async(userId, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${userId}`);

//   dispatch({
//     type: 'FETCH_USER',
//     payload: response.data,
//   })
// });

export const fetchUser = (userId) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data,
  })
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  // const userIds = _.uniq(_.map(getState().posts, 'userId'))
  // userIds.forEach(id => dispatch(fetchUser(id)))

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};