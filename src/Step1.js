import React from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import { Input } from "./components/Input";
import { PrimaryButton } from "./components/PrimaryButton";
import { useData } from "./DataContext";
import Typography from "@material-ui/core/Typography";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, "Last name should not contain numbers")
    .required("Last name is a required field"),
});
export const Step1 = () => {
  const { data, setValues } = useData();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit = (data) => {
    history.push("/step2");
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        🦄 Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="firstName"
          type="text"
          label="First Name"
          ref={register}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          name="lastName"
          type="text"
          label="Last Name"
          ref={register}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton type="submit">Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
