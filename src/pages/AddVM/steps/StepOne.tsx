import * as React from "react";
import { useForm, Control, Controller } from "react-hook-form";
import {
  TextField,
  Box,
  InputAdornment,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import capitalize from "lodash/capitalize";
export interface IStepOneFormInput {
  firstName: string;
  VMAddress: string;
  username: string;
  password: string;
  procType: string;
  VMName: string;
}

const schema = yup.object({
  // firstName: yup.string().trim().required(),
  // VMAddress: yup
  //   .string()
  //   .trim()
  //   .matches(
  //     /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/,
  //     "Incorrect IP address value"
  //   )
  //   .required("IP address is required"),
  // username: yup.string().trim().required("Username name is required"),
  // password: yup.string().trim().required("Password name is required"),
  // procType: yup
  //   .string()
  //   .trim()
  //   .oneOf(["intel", "celeron", "xeon"])
  //   .required("Processor type name is required"),
  // VMName: yup.string().trim().required("Virtual machine name is required"),
});

const defaultValues = {
  firstName: "",
  VMAddress: "",
  username: "",
  password: "",
  procType: "",
  VMName: "",
};

export const useStepOneForm = () => {
  return useForm<IStepOneFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });
};

export type TStepOneProps = {
  control: Control<IStepOneFormInput>;
};

export type TStepOneState = {
  showPassword: boolean;
};

const procValues = ["intel", "celeron", "xeon"] as const;

export class StepOne extends React.Component<TStepOneProps, TStepOneState> {
  state = { showPassword: false };

  toggleShowPassword = () =>
    this.setState((prev) => ({ showPassword: !prev.showPassword }));

  render() {
    const { showPassword } = this.state;
    const { control } = this.props;

    return (
      <Box
        sx={{ width: 300, display: "flex", flexDirection: "column", gap: 3 }}
        component="form"
      >
        <Controller
          render={(props) => {
            console.log("form1", props);
            const { field, fieldState } = props;
            return (
              <TextField
                {...field}
                helperText={fieldState.error?.message}
                error={!!fieldState.error?.message}
                label="First Name *"
                placeholder="First Name"
                size="small"
                variant="standard"
              />
            );
          }}
          name="firstName"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label="Virtual Machine Address *"
              placeholder="Virtual Machine Address"
              size="small"
              variant="standard"
            />
          )}
          name="VMAddress"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label="Login *"
              placeholder="Login"
              size="small"
              variant="standard"
            />
          )}
          name="username"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label="Password *"
              placeholder="Password"
              size="small"
              variant="standard"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.toggleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
          name="password"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              select
              label="Processor type *"
              placeholder="Processor type"
              size="small"
              variant="standard"
            >
              {procValues.map((proc) => (
                <MenuItem key={proc} value={proc}>
                  {capitalize(proc)}
                </MenuItem>
              ))}
            </TextField>
          )}
          name="procType"
          control={control}
        />
        <Controller
          render={(params) => (
            <TextField
              {...params.field}
              helperText={params.fieldState.error?.message}
              error={!!params.fieldState.error?.message}
              label="Virtual machine name *"
              placeholder="Virtual machine name"
              size="small"
              variant="standard"
            />
          )}
          name="VMName"
          control={control}
        />
      </Box>
    );
  }
}
