import React, { Component } from 'react'

import { Formik } from 'formik'
import { object, ref, string } from 'yup'

import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'


import Spinner from './Spinner'
import Alert from './Alert'

export default class EditUserPassword extends Component {
    state = {
      password: false,
    }
  
    _handleModalClose = () => {
      this.setState(() => ({
        password: false,
      }))
    }
  
    _renderModal = () => {
      const onClick = () => {
        this.setState(() => ({ password: false }))
      }
  
      return (
        <Alert
          isOpen={this.state.password}
          onClose={this._handleClose}
          handleSubmit={onClick}
          title="Password Reset"
          text="Your password was changed successfully"
          submitButtonText="Done"
        />
      )
    }
  
    _handleSubmit = ({
      oldPassword,
      password,
      confirmPassword,
      setSubmitting,
      resetForm,
    }) => {
      // fake async login
      setTimeout(async () => {
        setSubmitting(false)
  
        this.setState(() => ({
          password: true,
        }))
  
        resetForm()
      }, 1000)
    }
  
    render() {
      return (
        <Formik
          initialValues={{
            oldPassword: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={object().shape({
            oldPassword: string().required('Current password is required'),
            password: string().required('New password is required'),
            confirmPassword: string()
              .oneOf([ref('password')], 'Passwords do not match')
              .required('Password is required'),
          })}
          onSubmit={(
            { oldPassword, password, confirmPassword },
            { setSubmitting, resetForm }
          ) =>
            this._handleSubmit({
              oldPassword,
              password,
              confirmPassword,
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
              <Paper>
                <form className="form" onSubmit={handleSubmit}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel
                      htmlFor="password-current"
                      error={Boolean(touched.oldPassword && errors.oldPassword)}
                    >
                      {'Current Password'}
                    </InputLabel>
                    <Input
                      id="password-current"
                      name="oldPassword"
                      type="password"
                      value={values.oldPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.oldPassword && errors.currentPass)}
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
                    error={Boolean(touched.password && errors.password)}
                  >
                    <InputLabel
                      htmlFor="password-new"
                      error={Boolean(touched.password && errors.password)}
                    >
                      {'New Password'}
                    </InputLabel>
                    <Input
                      id="password-new"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.password && errors.password)}
                    />
                    <FormHelperText
                      error={Boolean(touched.password && errors.password)}
                    >
                      {touched.password && errors.password ? errors.password : ''}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                  >
                    <InputLabel
                      htmlFor="password-confirm"
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    >
                      {'Confirm Password'}
                    </InputLabel>
                    <Input
                      id="password-confirm"
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    />
                    <FormHelperText
                      error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                    >
                      {touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ''}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="raised"
                    color="primary"
                    disabled={Boolean(!isValid || isSubmitting)}
                    style={{ margin: '16px' }}
                  >
                    {'Reset Password'}
                  </Button>
                </form>
                {this._renderModal()}
              </Paper>
            )
          }}
        />
      )
    }
  }