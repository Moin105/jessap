import React from 'react'
import Editor from './Editor'
import Header from "../Header";
import Sops from "./Sops";
import AddSops from "./AddSops";
import { Formik, Form, Field } from "formik";
import { Route, Routes } from "react-router-dom";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import  './styles.css'
function SopAdd({show,setShow}) {
  return (
    
<React.Fragment>
<div className="container" >
  <Header   show={show} setShow={setShow}/>
        <Editor/>
        <div className='contaiers'>
        <Formik
        initialValues={{ example: '', description: '' }}
        // onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
              
                 <FormControl>
                <FormLabel htmlFor="email">Example SOP</FormLabel>
                <Field as={Input} type="email" name="email" id="email" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">Description</FormLabel>
                <Field
                as="textarea"
                id="description"
                name="description"
                placeholder="Enter description"
              />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="password">Password</FormLabel>
              <Field as="select" id="dropdownOption" name="dropdownOption">
                <option value="">Select an option</option>
                <option value="create_sop_from_scratch">Create SOP from scratch</option>
                <option value="use_ai_to_create_process">Use AI to create process</option>
              </Field>
              </FormControl>
              {/* <Button
                mt={4}
                colorScheme="blue"
                type="submit"
                onClick={submitForm}
              >
                Submit
              </Button> */}
            {/* <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" /> */}
            <button style={{margin:"10px 0px"}} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
        </div>
    </div>
</React.Fragment>
  )
}

export default SopAdd



