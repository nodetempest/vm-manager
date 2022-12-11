import * as React from "react";
import { useForm, Control, Controller } from "react-hook-form";
import { Box, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { keyLabelMap, IStepOneFormInput } from "./StepOne";

export interface IStepThreeFormInput {
  powerOn: boolean;
}

const schema = yup.object({
  powerOn: yup.boolean(),
});

const defaultValues = {
  powerOn: false,
};

export const useStepThreeForm = () => {
  return useForm<IStepThreeFormInput>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });
};

export type TStepThreeProps = {
  control: Control<IStepThreeFormInput>;
} & IStepOneFormInput;

export class StepThree extends React.Component<TStepThreeProps> {
  render() {
    const { control, ...VMData } = this.props;

    return (
      <>
        <Typography sx={{ mb: 3 }}>Summary</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "4px",
            width: 600,
            pb: 4,
            borderBottom: "1px solid",
            borderColor: "grey.300",
            mb: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              alignItems: "flex-end",
              flexBasis: 220,
            }}
          >
            {Object.keys(VMData).map((key) => (
              <Typography
                key={key}
                variant="subtitle2"
                sx={{ color: "grey.600" }}
              >
                {keyLabelMap[key as keyof typeof VMData]}:
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {Object.entries(VMData).map(([key, value]) => (
              <Typography key={key} variant="subtitle2" fontWeight={600}>
                {value}
              </Typography>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: 600, display: "flex", justifyContent: "flex-end" }}>
          <Controller
            name="powerOn"
            control={control}
            render={(params) => (
              <FormControlLabel
                label="Power on VM after creating"
                control={<Checkbox size="small" sx={{ p: "4px" }} />}
                sx={{
                  m: 0,
                  "& .MuiFormControlLabel-label": (theme) => ({
                    ...theme.typography.subtitle2,
                  }),
                }}
                {...params.field}
                onChange={params.field.onChange}
                checked={params.field.value}
              />
            )}
          />
        </Box>
      </>
    );
  }
}
