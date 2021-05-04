import React from 'react';
//
// Enzyme.configure({ adapter: new Adapter() });
let wrapper;
//let wrapper = shallow(<Login />);

// beforeEach(() => {
//     info = {
//         username: '',
//         password: '',
//     };
//     errors = {
//         username: '',
//         password: '',
//     };
//
//     validateInfo = jest.fn();
//     updateInfo = jest.fn();
//     saveToken = jest.fn();
//     props = {
//         info,
//         errors,
//         validateInfo,
//         updateInfo,
//         saveToken,
//     };
//     wrapper = shallow(<Login {...props} />);
// });

test('should render LoginForm correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

// test('should render Text Fields correctly', () => {
//     expect(wrapper.find(input).length).toBe(2);
// });
//
// test('should render Button correctly', () => {
//     expect(wrapper.find(button).length).toBe(1);
// });

// test('should update data correctly(password)', () => {
//     const password = '11111111';
//     const field = wrapper.find(TextField).find({ name: 'password' });
//     field.simulate('change', {
//         target: {
//             name: field.prop('name'),
//             value: password,
//         },
//     });
//     expect(updateInfo).toHaveBeenCalledWith('password', password);
//     expect(validateInfo).toHaveBeenCalledWith('password', password);
// });
//
// test('should update data correctly(username)', () => {
//     const username = 'username';
//     const field = wrapper.find(TextField).find({ name: 'username' });
//     field.simulate('change', {
//         target: {
//             name: field.prop('name'),
//             value: username,
//         },
//     });
//     expect(updateInfo).toHaveBeenCalledWith('username', username);
//     expect(validateInfo).toHaveBeenCalledWith('username', username);
// });
//
// test('should login', (done) => {
//     const username = 'i';
//     const password = 'iiiiiiii';
//     info = {
//         username: username,
//         password: password,
//     };
//     axios.post.mockImplementationOnce(
//         () =>
//             Promise.resolve({
//                 data: {
//                     access_token: 'something',
//                 },
//             }), //promise
//     );
//
//     wrapper = shallow(<Login {...props} info={info} />);
//     wrapper.find('form').simulate('submit', {
//         preventDefault: () => {},
//     });
//     setTimeout(() => {
//         expect(saveToken).toHaveBeenCalledTimes(1);
//         done();
//     }, 0);
// });
