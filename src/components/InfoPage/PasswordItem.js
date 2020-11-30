import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//formik and yup
import { Formik } from 'formik'
import { object, ref, string } from 'yup'

//material ui imports
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

//pages
import Spinner from './Spinner'
import Alert from './Alert'
import './InfoPage.css'

const styles = theme => ({
    center: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        }
    },
})


class EditUserPassword extends Component {
    state = {
        item: {
            id: this.props.user.id,
            password: false,
        }
    };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
    }

    submit = (e) => {
        this.setState({ mode: 'view' });
        this.props.dispatch({
            type: 'UPDATE_PASSWORD',
            payload: this.state.item
        })
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
            item: { ...this.state.item, [event.target.name]: event.target.value }
        })
    }

    back = () => {
        this.props.clearEdit()
    }

    handleModalClose = () => {
        this.setState(() => ({
            password: false,
        }))
    }

    renderModal = () => {
        const onClick = () => {
            this.setState(() => ({ password: false }))
        }

        return (
            <Alert
                isOpen={this.state.password}
                onClose={this.handleClose}
                handleSubmit={onClick}
                title="Password Reset"
                text="Your password was changed successfully"
                submitButtonText="Done"
            />
        )
    }

    render() {
        return (
            <Formik
                initialValues={{
                    currentPass: '',
                    newPass: '',
                    confirmPass: '',
                }}
                validationSchema={object().shape({
                    currentPass: string().required('Current password is required'),
                    newPass: string().required('New password is required'),
                    confirmPass: string()
                        .oneOf([ref('newPass')], 'Passwords do not match')
                        .required('Password is required'),
                })}
                onSubmit={(
                    { currentPass, newPass, confirmPass },
                    { setSubmitting, resetForm }
                ) =>
                    this.handleSubmit({
                        currentPass,
                        newPass,
                        confirmPass,
                        setSubmitting,
                        resetForm,
                    })
                }
                render={props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                    } = props
                    return isSubmitting ? (
                        <Spinner />
                    ) : (
                            <Grid
                                container
                                justify="center"
                                spacing={0}
                            >
                                <Grid item xs={11} sm={6} md={5} lg={4} style={{ marginTop: 25 }} >
                                    <Paper className="form form--wrapper" elevation={10}>
                                        <Grid container justify="center">
                                            <Grid item xs={10}  >
                                                <form className="form" onSubmit={this.submit}>
                                                    <br /><br />
                                                    <InputLabel>Change Password</InputLabel>
                                                    <br /><br />

                                                    <FormControl fullWidth margin="dense">
                                                        <InputLabel
                                                            htmlFor="password-current"
                                                            error={Boolean(touched.currentPass && errors.currentPass)}
                                                        >
                                                            {'Current Password'}
                                                        </InputLabel>
                                                        <Input
                                                            id="password-current"
                                                            name="currentPass"
                                                            type="password"
                                                            value={values.currentPass}
                                                            onChange={this.handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.currentPass && errors.currentPass)}
                                                        />
                                                        <FormHelperText
                                                            error={Boolean(touched.currentPass && errors.currentPass)}
                                                        >
                                                            {touched.currentPass && errors.currentPass
                                                                ? errors.currentPass
                                                                : ''}
                                                        </FormHelperText>
                                                    </FormControl>

                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        error={Boolean(touched.newPass && errors.newPass)}
                                                    >
                                                        <InputLabel
                                                            htmlFor="password-new"
                                                            error={Boolean(touched.newPass && errors.newPass)}
                                                        >
                                                            {'New Password'}
                                                        </InputLabel>
                                                        <Input
                                                            id="password-new"
                                                            name="newPass"
                                                            type="password"
                                                            value={values.newPass}
                                                            onChange={this.handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.newPass && errors.newPass)}
                                                        />
                                                        <FormHelperText
                                                            error={Boolean(touched.newPass && errors.newPass)}
                                                        >
                                                            {touched.newPass && errors.newPass ? errors.newPass : ''}
                                                        </FormHelperText>
                                                    </FormControl>

                                                    <FormControl
                                                        fullWidth
                                                        margin="dense"
                                                        error={Boolean(touched.confirmPass && errors.confirmPass)}
                                                    >
                                                        <InputLabel
                                                            htmlFor="password-confirm"
                                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                                        >
                                                            {'Confirm Password'}
                                                        </InputLabel>
                                                        <Input
                                                            id="password-confirm"
                                                            name="confirmPass"
                                                            type="password"
                                                            value={values.confirmPass}
                                                            onChange={this.handleChange}
                                                            onBlur={handleBlur}
                                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                                        />
                                                        <FormHelperText
                                                            error={Boolean(touched.confirmPass && errors.confirmPass)}
                                                        >
                                                            {touched.confirmPass && errors.confirmPass
                                                                ? errors.confirmPass
                                                                : ''}
                                                        </FormHelperText>
                                                    </FormControl>

                                                    <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            disabled={Boolean(!isValid || isSubmitting)}
                                                            style={{ margin: '16px' }}
                                                        >{'Reset Password'}</Button>
                                                        <Button color="primary" variant="contained" onClick={this.back}>Cancel</Button>
                                                    </Grid>
                                                </form>
                                            </Grid>
                                        </Grid>
                                        {this.renderModal()}
                                    </Paper>
                                </Grid>
                            </Grid>
                        )
                }}
            />
        );
    }

}
export default connect()(withRouter(withStyles(styles, { withTheme: true })(EditUserPassword)));


// export default class EditUserPassword extends Component {
//   state = {
//     password: false,
//   }

//   _handleModalClose = () => {
//     this.setState(() => ({
//       password: false,
//     }))
//   }

//   _renderModal = () => {
//     const onClick = () => {
//       this.setState(() => ({ password: false }))
//     }

//     return (
//       <Alert
//         isOpen={this.state.password}
//         onClose={this._handleClose}
//         handleSubmit={onClick}
//         title="Password Reset"
//         text="Your password was changed successfully"
//         submitButtonText="Done"
//       />
//     )
//   }

//   _handleSubmit = ({
//     currentPass,
//     newPass,
//     confirmPass,
//     setSubmitting,
//     resetForm,
//   }) => {
//     // fake async login
//     setTimeout(async () => {
//       setSubmitting(false)

//       this.setState(() => ({
//         password: true,
//       }))

//       resetForm()
//     }, 1000)
//   }

//   render() {
//     return (
//       <Formik
//         initialValues={{
//           currentPass: '',
//           newPass: '',
//           confirmPass: '',
//         }}
//         validationSchema={object().shape({
//           currentPass: string().required('Current password is required'),
//           newPass: string().required('New password is required'),
//           confirmPass: string()
//             .oneOf([ref('newPass')], 'Passwords do not match')
//             .required('Password is required'),
//         })}
//         onSubmit={(
//           { currentPass, newPass, confirmPass },
//           { setSubmitting, resetForm }
//         ) =>
//           this._handleSubmit({
//             currentPass,
//             newPass,
//             confirmPass,
//             setSubmitting,
//             resetForm,
//           })
//         }
//         render={props => {
//           const {
//             values,
//             touched,
//             errors,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isValid,
//             isSubmitting,
//           } = props
//           return isSubmitting ? (
//             <Spinner />
//           ) : (
//             <Paper className="form form--wrapper" elevation={10}>
//               <form className="form" onSubmit={handleSubmit}>
//                 <FormControl fullWidth margin="dense">
//                   <InputLabel
//                     htmlFor="password-current"
//                     error={Boolean(touched.currentPass && errors.currentPass)}
//                   >
//                     {'Current Password'}
//                   </InputLabel>
//                   <Input
//                     id="password-current"
//                     name="currentPass"
//                     type="password"
//                     value={values.currentPass}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={Boolean(touched.currentPass && errors.currentPass)}
//                   />
//                   <FormHelperText
//                     error={Boolean(touched.currentPass && errors.currentPass)}
//                   >
//                     {touched.currentPass && errors.currentPass
//                       ? errors.currentPass
//                       : ''}
//                   </FormHelperText>
//                 </FormControl>
//                 <FormControl
//                   fullWidth
//                   margin="dense"
//                   error={Boolean(touched.newPass && errors.newPass)}
//                 >
//                   <InputLabel
//                     htmlFor="password-new"
//                     error={Boolean(touched.newPass && errors.newPass)}
//                   >
//                     {'New Password'}
//                   </InputLabel>
//                   <Input
//                     id="password-new"
//                     name="newPass"
//                     type="password"
//                     value={values.newPass}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={Boolean(touched.newPass && errors.newPass)}
//                   />
//                   <FormHelperText
//                     error={Boolean(touched.newPass && errors.newPass)}
//                   >
//                     {touched.newPass && errors.newPass ? errors.newPass : ''}
//                   </FormHelperText>
//                 </FormControl>
//                 <FormControl
//                   fullWidth
//                   margin="dense"
//                   error={Boolean(touched.confirmPass && errors.confirmPass)}
//                 >
//                   <InputLabel
//                     htmlFor="password-confirm"
//                     error={Boolean(touched.confirmPass && errors.confirmPass)}
//                   >
//                     {'Confirm Password'}
//                   </InputLabel>
//                   <Input
//                     id="password-confirm"
//                     name="confirmPass"
//                     type="password"
//                     value={values.confirmPass}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     error={Boolean(touched.confirmPass && errors.confirmPass)}
//                   />
//                   <FormHelperText
//                     error={Boolean(touched.confirmPass && errors.confirmPass)}
//                   >
//                     {touched.confirmPass && errors.confirmPass
//                       ? errors.confirmPass
//                       : ''}
//                   </FormHelperText>
//                 </FormControl>
//                 <Button
//                   type="submit"
//                   variant="raised"
//                   color="primary"
//                   disabled={Boolean(!isValid || isSubmitting)}
//                   style={{ margin: '16px' }}
//                 >
//                   {'Reset Password'}
//                 </Button>
//               </form>
//               {this._renderModal()}
//             </Paper>
//           )
//         }}
//       />
//     )
//   }
// }
